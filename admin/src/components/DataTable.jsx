import { Edit3, Power, Star, Trash2 } from "lucide-react";

const DataTable = ({ columns, rows, loading, onEdit, onDelete, onToggleStatus, onToggleBoolean, booleanToggles = [] }) => {
  if (loading) {
    return (
      <div className="rounded-md border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-panel">
        Loading records...
      </div>
    );
  }

  if (!rows.length) {
    return (
      <div className="rounded-md border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-sm font-semibold text-slate-700">No records found</p>
        <p className="mt-1 text-xs text-slate-500">Add content or adjust the website filter.</p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-md border border-slate-200 bg-white shadow-panel">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-slate-200 text-sm">
          <thead className="bg-slate-50">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 text-left text-xs font-bold uppercase tracking-normal text-slate-500">
                  {column.label}
                </th>
              ))}
              <th className="px-4 py-3 text-right text-xs font-bold uppercase tracking-normal text-slate-500">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {rows.map((row) => (
              <tr key={row._id} className="hover:bg-slate-50">
                {columns.map((column) => (
                  <td key={column.key} className="max-w-xs px-4 py-3 align-top text-slate-700">
                    {column.render ? column.render(row) : row[column.key] || "-"}
                  </td>
                ))}
                <td className="px-4 py-3">
                  <div className="flex justify-end gap-2">
                    {row.status !== undefined && onToggleStatus ? (
                      <button
                        type="button"
                        onClick={() => onToggleStatus(row)}
                        className="btn-secondary p-2"
                        aria-label="Toggle status"
                        title="Toggle status"
                      >
                        <Power size={16} />
                      </button>
                    ) : null}
                    {booleanToggles.map((field) => (
                      <button
                        key={field.name}
                        type="button"
                        onClick={() => onToggleBoolean?.(row, field)}
                        className={row[field.name] ? "btn-primary p-2" : "btn-secondary p-2"}
                        aria-label={field.trueLabel || field.name}
                        title={row[field.name] ? field.falseLabel || "Disable" : field.trueLabel || "Enable"}
                      >
                        <Star size={16} />
                      </button>
                    ))}
                    <button type="button" onClick={() => onEdit(row)} className="btn-secondary p-2" aria-label="Edit" title="Edit">
                      <Edit3 size={16} />
                    </button>
                    <button type="button" onClick={() => onDelete(row)} className="btn-danger p-2" aria-label="Delete" title="Delete">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DataTable;
