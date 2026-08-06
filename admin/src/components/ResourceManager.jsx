import { Plus, RefreshCw, Save, Search, X } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import api from "../api/axiosInstance.js";
import ConfirmDialog from "./ConfirmDialog.jsx";
import DataTable from "./DataTable.jsx";
import ImageUpload from "./ImageUpload.jsx";
import { websiteOptions } from "../utils/resourceConfigs.js";

const emptyValueForField = (field) => {
  if (field.type === "checkbox") return false;
  if (field.type === "json") return field.name === "tags" ? "[]" : field.name === "socialLinks" ? "{}" : "[]";
  if (["repeatable", "keyValue", "orderedRepeatable"].includes(field.type)) return "";
  if (field.multiple) return [];
  if (field.name === "status") return field.options?.[0]?.value || "active";
  if (field.name === "websiteKey") return field.options?.[0]?.value || "group";
  return "";
};

const toFormValues = (fields, item = null) =>
  fields.reduce((acc, field) => {
    const raw = item ? item[field.name] : undefined;
    if (raw === undefined || raw === null) {
      acc[field.name] = emptyValueForField(field);
    } else if (field.type === "json") {
      acc[field.name] = JSON.stringify(raw, null, 2);
    } else if (field.type === "repeatable") {
      acc[field.name] = Array.isArray(raw) ? raw.join("\n") : raw || "";
    } else if (field.type === "keyValue") {
      acc[field.name] = Array.isArray(raw) ? raw.map((item) => `${item.label || ""}: ${item.value || ""}`).join("\n") : "";
    } else if (field.type === "orderedRepeatable") {
      acc[field.name] = Array.isArray(raw) ? raw.sort((a, b) => (a.order || 0) - (b.order || 0)).map((item) => item.text || "").join("\n") : "";
    } else if (field.type === "date") {
      acc[field.name] = raw ? new Date(raw).toISOString().slice(0, 10) : "";
    } else {
      acc[field.name] = raw;
    }
    return acc;
  }, {});

const preparePayload = (fields, values) => {
  const payload = { ...values };
  fields.forEach((field) => {
    if (field.type === "json") {
      try {
        payload[field.name] = payload[field.name] ? JSON.parse(payload[field.name]) : field.name === "socialLinks" ? {} : [];
      } catch {
        throw new Error(`${field.label} must be valid JSON`);
      }
    }
    if (field.type === "number") payload[field.name] = payload[field.name] === "" ? 0 : Number(payload[field.name]);
    if (field.type === "checkbox") payload[field.name] = Boolean(payload[field.name]);
    if (field.type === "date" && payload[field.name] === "") delete payload[field.name];
    if (field.type === "repeatable") {
      payload[field.name] = String(payload[field.name] || "")
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean);
    }
    if (field.type === "keyValue") {
      payload[field.name] = String(payload[field.name] || "")
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean)
        .map((item) => {
          const [label, ...valueParts] = item.split(":");
          return { label: label.trim(), value: valueParts.join(":").trim() };
        })
        .filter((item) => item.label && item.value);
    }
    if (field.type === "orderedRepeatable") {
      payload[field.name] = String(payload[field.name] || "")
        .split(/\r?\n/)
        .map((item) => item.trim())
        .filter(Boolean)
        .map((text, index) => ({ text, order: index + 1 }));
    }
  });
  return payload;
};

const Badge = ({ value }) => {
  const active = value === "active" || value === "published" || value === "new" || value === "shortlisted" || value === "hired";
  return (
    <span
      className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${
        active ? "bg-emerald-50 text-emerald-700" : "bg-slate-100 text-slate-600"
      }`}
    >
      {value || "-"}
    </span>
  );
};

const ResourceManager = ({ config }) => {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeItem, setActiveItem] = useState(null);
  const [formOpen, setFormOpen] = useState(false);
  const [websiteFilter, setWebsiteFilter] = useState("");
  const [search, setSearch] = useState("");
  const [extraFilters, setExtraFilters] = useState({});
  const [confirmState, setConfirmState] = useState(null);

  const { register, handleSubmit, reset, watch, setValue, formState } = useForm({
    defaultValues: toFormValues(config.fields)
  });

  const columns = useMemo(
    () =>
      config.columns.map((column) => ({
        ...column,
        render:
          column.type === "boolean"
            ? (row) => <Badge value={row[column.key] ? "Yes" : "No"} />
            : column.key === "status"
            ? (row) => <Badge value={row.status} />
            : column.type === "link"
              ? (row) => row[column.key] ? <a className="font-semibold text-brand-700 hover:underline" href={row[column.key]} target="_blank" rel="noreferrer">Open</a> : "-"
            : column.type === "image"
              ? (row) => row[column.key] ? <img src={row[column.key]} alt={row.name || row.title || "Logo"} className="h-12 w-20 rounded border border-slate-200 object-contain bg-white" /> : "-"
            : column.key.toLowerCase().includes("date")
              ? (row) => (row[column.key] ? new Date(row[column.key]).toLocaleDateString() : "-")
              : undefined
      })),
    [config.columns]
  );

  const loadRows = async () => {
    setLoading(true);
    try {
      const params = {};
      if (config.filterByWebsite && websiteFilter) params.websiteKey = websiteFilter;
      if (search.trim()) params.search = search.trim();
      Object.entries(extraFilters).forEach(([key, value]) => {
        if (value) params[key] = value;
      });
      const { data } = await api.get(config.endpoint, { params });
      setRows(data.data.items || data.data || []);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRows();
  }, [config.endpoint, websiteFilter, extraFilters, search]);

  const openCreate = () => {
    setActiveItem(null);
    reset(toFormValues(config.fields));
    setFormOpen(true);
  };

  const openEdit = (item) => {
    setActiveItem(item);
    reset(toFormValues(config.fields, item));
    setFormOpen(true);
  };

  const closeForm = () => {
    setFormOpen(false);
    setActiveItem(null);
    reset(toFormValues(config.fields));
  };

  const onSubmit = async (values) => {
    setSaving(true);
    try {
      const payload = preparePayload(config.fields, values);
      const request = activeItem
        ? api.put(`${config.endpoint}/${activeItem._id}`, payload)
        : api.post(config.endpoint, payload);
      const { data } = await request;
      toast.success(data.message);
      closeForm();
      loadRows();
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const performDelete = async (item) => {
    try {
      const { data } = await api.delete(`${config.endpoint}/${item._id}`);
      toast.success(data.message);
      loadRows();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    } finally {
      setConfirmState(null);
    }
  };

  const deleteItem = (item) => {
    setConfirmState({
      variant: "danger",
      title: "Delete record?",
      message: "This will permanently delete the selected record from this CMS area.",
      confirmLabel: "Delete",
      onConfirm: () => performDelete(item)
    });
  };

  const performStatusUpdate = async (item, nextStatus) => {
    try {
      const request = config.statusPatch
        ? api.patch(`${config.endpoint}/${item._id}/status`, { status: nextStatus })
        : api.put(`${config.endpoint}/${item._id}`, { status: nextStatus });
      const { data } = await request;
      toast.success(data.message);
      loadRows();
    } catch (error) {
      toast.error(error.response?.data?.message || "Status update failed");
    } finally {
      setConfirmState(null);
    }
  };

  const performBooleanUpdate = async (item, field) => {
    try {
      const { data } = await api.put(`${config.endpoint}/${item._id}`, { [field.name]: !item[field.name] });
      toast.success(data.message);
      loadRows();
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    } finally {
      setConfirmState(null);
    }
  };

  const toggleBoolean = (item, field) => {
    setConfirmState({
      variant: "default",
      title: `Change ${field.trueLabel || field.name}?`,
      message: `This will mark the selected record as ${item[field.name] ? field.falseLabel || "disabled" : field.trueLabel || "enabled"}.`,
      confirmLabel: "Update",
      onConfirm: () => performBooleanUpdate(item, field)
    });
  };

  const toggleStatus = (item) => {
    const statusField = config.fields.find((field) => field.name === "status");
    if (!statusField?.options?.length) return;
    const nextStatus =
      item.status === statusField.options[0].value
        ? statusField.options[1]?.value || statusField.options[0].value
        : statusField.options[0].value;

    setConfirmState({
      variant: "default",
      title: "Change status?",
      message: `This will change the selected record status to "${nextStatus}".`,
      confirmLabel: "Change status",
      onConfirm: () => performStatusUpdate(item, nextStatus)
    });
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 rounded-md border border-slate-200 bg-white p-5 shadow-panel md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">{config.title}</h1>
          <p className="mt-1 text-sm text-slate-500">Create, update, publish, sort, and manage website-wise CMS content.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {config.filterByWebsite ? (
            <select className="form-input w-44" value={websiteFilter} onChange={(event) => setWebsiteFilter(event.target.value)}>
              <option value="">All websites</option>
              {websiteOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : null}
          <div className="relative w-full sm:w-64">
            <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
            <input
              className="form-input pl-9"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") loadRows();
              }}
              placeholder="Search records"
            />
          </div>
          {config.filterFields?.map((field) => (
            <select
              key={field.name}
              className="form-input w-44"
              value={extraFilters[field.name] || ""}
              onChange={(event) =>
                setExtraFilters((current) => ({
                  ...current,
                  [field.name]: event.target.value
                }))
              }
            >
              <option value="">{field.allLabel || `All ${field.label}`}</option>
              {field.options.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ))}
          <button type="button" className="btn-secondary" onClick={loadRows}>
            <RefreshCw size={16} />
            Refresh
          </button>
          {!config.disableCreate ? (
            <button type="button" className="btn-primary" onClick={openCreate}>
              <Plus size={16} />
              {config.createLabel || "Add"}
            </button>
          ) : null}
        </div>
      </div>

      {formOpen ? (
        <form onSubmit={handleSubmit(onSubmit)} className="rounded-md border border-slate-200 bg-white p-5 shadow-panel">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-950">{activeItem ? "Edit Record" : config.createLabel}</h2>
            <button type="button" onClick={closeForm} className="btn-secondary p-2" aria-label="Close form">
              <X size={16} />
            </button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {config.fields.map((field) => {
              const error = formState.errors[field.name];
              const common = {
                ...register(field.name, { required: field.required ? `${field.label} is required` : false })
              };

              if (field.type === "image") {
                return (
                  <div key={field.name} className={field.multiple ? "md:col-span-2 xl:col-span-3" : ""}>
                    <ImageUpload
                      label={field.label}
                      multiple={field.multiple}
                      value={watch(field.name)}
                      onChange={(value) => setValue(field.name, value, { shouldDirty: true, shouldValidate: true })}
                    />
                    {error ? <p className="mt-1 text-xs text-rose-600">{error.message}</p> : null}
                  </div>
                );
              }

              if (field.type === "checkbox") {
                return (
                  <label key={field.name} className="flex items-center gap-3 rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm font-semibold text-slate-700">
                    <input type="checkbox" className="h-4 w-4 rounded border-slate-300 text-brand-600" {...common} />
                    {field.label}
                  </label>
                );
              }

              return (
                <div key={field.name} className={["textarea", "json", "keyValue", "orderedRepeatable", "repeatable"].includes(field.type) ? "md:col-span-2 xl:col-span-3" : ""}>
                  <label className="form-label" htmlFor={field.name}>
                    {field.label}
                  </label>
                  {field.type === "select" ? (
                    <select id={field.name} className="form-input" {...common}>
                      {field.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  ) : ["textarea", "json", "repeatable", "keyValue", "orderedRepeatable"].includes(field.type) ? (
                    <textarea id={field.name} rows={field.type === "json" ? 7 : ["repeatable", "keyValue", "orderedRepeatable"].includes(field.type) ? 5 : 4} className="form-input" {...common} />
                  ) : (
                    <input id={field.name} type={field.type || "text"} className="form-input" {...common} />
                  )}
                  {field.hint ? <p className="mt-1 text-xs text-slate-400">{field.hint}</p> : null}
                  {error ? <p className="mt-1 text-xs text-rose-600">{error.message}</p> : null}
                </div>
              );
            })}
          </div>

          <div className="mt-5 flex justify-end gap-2">
            <button type="button" className="btn-secondary" onClick={closeForm}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={saving}>
              <Save size={16} />
              {saving ? "Saving..." : "Save"}
            </button>
          </div>
        </form>
      ) : null}

      <DataTable
        columns={columns}
        rows={rows}
        loading={loading}
        onEdit={openEdit}
        onDelete={deleteItem}
        onToggleStatus={toggleStatus}
        onToggleBoolean={config.booleanToggles?.length ? toggleBoolean : undefined}
        booleanToggles={config.booleanToggles}
      />

      <ConfirmDialog
        open={Boolean(confirmState)}
        title={confirmState?.title}
        message={confirmState?.message}
        confirmLabel={confirmState?.confirmLabel}
        variant={confirmState?.variant}
        onConfirm={confirmState?.onConfirm}
        onCancel={() => setConfirmState(null)}
      />
    </div>
  );
};

export default ResourceManager;
