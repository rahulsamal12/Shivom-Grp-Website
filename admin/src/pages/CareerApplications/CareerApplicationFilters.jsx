import { Search } from "lucide-react";
import { websiteOptions } from "../../utils/resourceConfigs.js";
import { applicationStatuses } from "./CareerApplicationStatusModal.jsx";

const CareerApplicationFilters = ({ filters, onChange, onReset }) => {
  const update = (key, value) => onChange({ ...filters, [key]: value });

  return (
    <div className="grid gap-3 rounded-md border border-slate-200 bg-white p-4 shadow-panel md:grid-cols-2 xl:grid-cols-6">
      <div className="relative xl:col-span-2">
        <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
        <input className="form-input pl-9" value={filters.search || ""} onChange={(event) => update("search", event.target.value)} placeholder="Search applicant, email, phone, job" />
      </div>
      <select className="form-input" value={filters.websiteKey || ""} onChange={(event) => update("websiteKey", event.target.value)}>
        <option value="">All websites</option>
        {websiteOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
      </select>
      <select className="form-input" value={filters.status || ""} onChange={(event) => update("status", event.target.value)}>
        <option value="">All statuses</option>
        {applicationStatuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
      </select>
      <input className="form-input" type="date" value={filters.fromDate || ""} onChange={(event) => update("fromDate", event.target.value)} />
      <input className="form-input" type="date" value={filters.toDate || ""} onChange={(event) => update("toDate", event.target.value)} />
      <div className="flex gap-2 xl:col-span-6">
        <input className="form-input max-w-sm" value={filters.careerId || ""} onChange={(event) => update("careerId", event.target.value)} placeholder="Career ID filter" />
        <button type="button" className="btn-secondary" onClick={onReset}>Reset</button>
      </div>
    </div>
  );
};

export default CareerApplicationFilters;
