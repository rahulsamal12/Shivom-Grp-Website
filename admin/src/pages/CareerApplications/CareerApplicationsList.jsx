import { Download, Eye, FileText, RefreshCw, SlidersHorizontal, Trash2 } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import api from "../../api/axiosInstance.js";
import ConfirmDialog from "../../components/ConfirmDialog.jsx";
import CareerApplicationFilters from "./CareerApplicationFilters.jsx";
import CareerApplicationStatusModal, { applicationStatuses } from "./CareerApplicationStatusModal.jsx";

const statusClasses = {
  new: "bg-sky-50 text-sky-700",
  reviewed: "bg-indigo-50 text-indigo-700",
  shortlisted: "bg-emerald-50 text-emerald-700",
  interview_scheduled: "bg-amber-50 text-amber-700",
  rejected: "bg-rose-50 text-rose-700",
  hired: "bg-green-50 text-green-700",
  archived: "bg-slate-100 text-slate-600"
};

export const StatusBadge = ({ status }) => (
  <span className={`inline-flex rounded-md px-2 py-1 text-xs font-semibold ${statusClasses[status] || "bg-slate-100 text-slate-600"}`}>
    {applicationStatuses.find((item) => item.value === status)?.label || status || "-"}
  </span>
);

const formatDate = (value) => (value ? new Date(value).toLocaleString() : "-");

const saveBlob = (blob, filename) => {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename || "resume";
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => window.URL.revokeObjectURL(url), 1000);
};

export const useResumeActions = () => {
  const viewResume = async (application) => {
    try {
      const { data } = await api.get(`/admin/career-applications/${application._id}/resume/view`, { responseType: "blob" });
      const blob = new Blob([data], { type: application.resumeMimeType || "application/octet-stream" });
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank", "noopener,noreferrer");
      window.setTimeout(() => window.URL.revokeObjectURL(url), 60000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to open CV");
    }
  };

  const downloadResume = async (application) => {
    try {
      const { data } = await api.get(`/admin/career-applications/${application._id}/resume/download`, { responseType: "blob" });
      saveBlob(data, application.resumeOriginalName);
    } catch (error) {
      toast.error(error.response?.data?.message || "Unable to download CV");
    }
  };

  return { viewResume, downloadResume };
};

const CareerApplicationsList = () => {
  const [rows, setRows] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 20, total: 0, pages: 1 });
  const [filters, setFilters] = useState({ page: 1, limit: 20 });
  const [loading, setLoading] = useState(true);
  const [statusItem, setStatusItem] = useState(null);
  const [savingStatus, setSavingStatus] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(null);
  const { viewResume, downloadResume } = useResumeActions();

  const params = useMemo(() => {
    const clean = {};
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") clean[key] = value;
    });
    return clean;
  }, [filters]);

  const loadRows = async () => {
    setLoading(true);
    try {
      const { data } = await api.get("/admin/career-applications", { params });
      setRows(data.data.items || []);
      setPagination(data.data.pagination || { page: 1, limit: 20, total: 0, pages: 1 });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = window.setTimeout(loadRows, 250);
    return () => window.clearTimeout(timer);
  }, [params]);

  const updateStatus = async (payload) => {
    if (!statusItem) return;
    setSavingStatus(true);
    try {
      const { data } = await api.patch(`/admin/career-applications/${statusItem._id}/status`, payload);
      toast.success(data.message);
      setStatusItem(null);
      loadRows();
    } catch (error) {
      toast.error(error.response?.data?.message || "Status update failed");
    } finally {
      setSavingStatus(false);
    }
  };

  const deleteItem = async () => {
    if (!confirmDelete) return;
    try {
      const { data } = await api.delete(`/admin/career-applications/${confirmDelete._id}`);
      toast.success(data.message);
      setConfirmDelete(null);
      loadRows();
    } catch (error) {
      toast.error(error.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 rounded-md border border-slate-200 bg-white p-5 shadow-panel md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-slate-950">Career Applications</h1>
          <p className="mt-1 text-sm text-slate-500">Review applicants, open CVs, schedule interviews, and update hiring status.</p>
        </div>
        <button type="button" className="btn-secondary" onClick={loadRows}>
          <RefreshCw size={16} />
          Refresh
        </button>
      </div>

      <CareerApplicationFilters
        filters={filters}
        onChange={(next) => setFilters({ ...next, page: 1 })}
        onReset={() => setFilters({ page: 1, limit: 20 })}
      />

      <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-panel">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200 text-sm">
            <thead className="bg-slate-50">
              <tr>
                {["Applicant Name", "Email", "Phone", "Job Title", "Website", "Experience", "Status", "Applied Date", "CV", "Actions"].map((heading) => (
                  <th key={heading} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-normal text-slate-500">{heading}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr><td colSpan={10} className="px-4 py-8 text-center text-slate-500">Loading applications...</td></tr>
              ) : rows.length ? rows.map((row) => (
                <tr key={row._id} className="hover:bg-slate-50">
                  <td className="px-4 py-3 font-semibold text-slate-900">{row.applicantName}</td>
                  <td className="px-4 py-3 text-slate-600">{row.email}</td>
                  <td className="px-4 py-3 text-slate-600">{row.phone}</td>
                  <td className="px-4 py-3 text-slate-700">{row.jobTitle}</td>
                  <td className="px-4 py-3 text-slate-600">{row.websiteKey}</td>
                  <td className="px-4 py-3 text-slate-600">{row.totalExperience || "-"}</td>
                  <td className="px-4 py-3"><StatusBadge status={row.status} /></td>
                  <td className="px-4 py-3 text-slate-600">{formatDate(row.createdAt)}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button type="button" className="btn-secondary p-2" onClick={() => viewResume(row)} title="View CV" aria-label="View CV"><Eye size={15} /></button>
                      <button type="button" className="btn-secondary p-2" onClick={() => downloadResume(row)} title="Download CV" aria-label="Download CV"><Download size={15} /></button>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <Link className="btn-secondary p-2" to={`/career-applications/${row._id}`} title="Details" aria-label="Details"><FileText size={15} /></Link>
                      <button type="button" className="btn-secondary p-2" onClick={() => setStatusItem(row)} title="Change status" aria-label="Change status"><SlidersHorizontal size={15} /></button>
                      <button type="button" className="btn-danger p-2" onClick={() => setConfirmDelete(row)} title="Delete" aria-label="Delete"><Trash2 size={15} /></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={10} className="px-4 py-10 text-center text-slate-500">No applications found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
        <span>Total: {pagination.total}</span>
        <div className="flex gap-2">
          <button className="btn-secondary" type="button" disabled={pagination.page <= 1} onClick={() => setFilters((current) => ({ ...current, page: pagination.page - 1 }))}>Previous</button>
          <span className="rounded-md border border-slate-200 bg-white px-3 py-2">Page {pagination.page} of {pagination.pages}</span>
          <button className="btn-secondary" type="button" disabled={pagination.page >= pagination.pages} onClick={() => setFilters((current) => ({ ...current, page: pagination.page + 1 }))}>Next</button>
        </div>
      </div>

      <CareerApplicationStatusModal open={Boolean(statusItem)} application={statusItem} saving={savingStatus} onClose={() => setStatusItem(null)} onSubmit={updateStatus} />
      <ConfirmDialog open={Boolean(confirmDelete)} title="Delete application?" message="This will delete the application and its locally stored CV file if available." confirmLabel="Delete" variant="danger" onConfirm={deleteItem} onCancel={() => setConfirmDelete(null)} />
    </div>
  );
};

export default CareerApplicationsList;
