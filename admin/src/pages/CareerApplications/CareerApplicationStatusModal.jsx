import { X } from "lucide-react";
import { useEffect, useState } from "react";

export const applicationStatuses = [
  { value: "new", label: "New" },
  { value: "reviewed", label: "Reviewed" },
  { value: "shortlisted", label: "Shortlisted" },
  { value: "interview_scheduled", label: "Interview Scheduled" },
  { value: "rejected", label: "Rejected" },
  { value: "hired", label: "Hired" },
  { value: "archived", label: "Archived" }
];

const interviewModes = [
  { value: "", label: "Select mode" },
  { value: "phone", label: "Phone" },
  { value: "google_meet", label: "Google Meet" },
  { value: "zoom", label: "Zoom" },
  { value: "office", label: "Office" },
  { value: "other", label: "Other" }
];

const CareerApplicationStatusModal = ({ open, application, saving, onClose, onSubmit }) => {
  const [form, setForm] = useState({
    status: "reviewed",
    adminRemarks: "",
    rejectionReason: "",
    interviewDate: "",
    interviewMode: "",
    interviewLink: ""
  });

  useEffect(() => {
    if (application) {
      setForm({
        status: application.status || "reviewed",
        adminRemarks: application.adminRemarks || "",
        rejectionReason: application.rejectionReason || "",
        interviewDate: application.interviewDate ? new Date(application.interviewDate).toISOString().slice(0, 16) : "",
        interviewMode: application.interviewMode || "",
        interviewLink: application.interviewLink || ""
      });
    }
  }, [application]);

  if (!open || !application) return null;

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 px-4">
      <form
        onSubmit={(event) => {
          event.preventDefault();
          onSubmit(form);
        }}
        className="w-full max-w-2xl rounded-md border border-slate-200 bg-white p-5 shadow-panel"
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-bold text-slate-950">Change Application Status</h2>
            <p className="mt-1 text-sm text-slate-500">{application.applicantName} - {application.jobTitle}</p>
          </div>
          <button type="button" className="btn-secondary p-2" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="form-label" htmlFor="status">Status</label>
            <select id="status" className="form-input" value={form.status} onChange={(event) => update("status", event.target.value)}>
              {applicationStatuses.map((status) => (
                <option key={status.value} value={status.value}>{status.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label" htmlFor="interviewDate">Interview Date</label>
            <input id="interviewDate" type="datetime-local" className="form-input" value={form.interviewDate} onChange={(event) => update("interviewDate", event.target.value)} disabled={form.status !== "interview_scheduled"} />
          </div>
          <div>
            <label className="form-label" htmlFor="interviewMode">Interview Mode</label>
            <select id="interviewMode" className="form-input" value={form.interviewMode} onChange={(event) => update("interviewMode", event.target.value)} disabled={form.status !== "interview_scheduled"}>
              {interviewModes.map((mode) => (
                <option key={mode.value} value={mode.value}>{mode.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label" htmlFor="interviewLink">Interview Link</label>
            <input id="interviewLink" className="form-input" value={form.interviewLink} onChange={(event) => update("interviewLink", event.target.value)} disabled={form.status !== "interview_scheduled"} />
          </div>
          {form.status === "rejected" ? (
            <div className="md:col-span-2">
              <label className="form-label" htmlFor="rejectionReason">Rejection Reason</label>
              <textarea id="rejectionReason" rows={3} className="form-input" value={form.rejectionReason} onChange={(event) => update("rejectionReason", event.target.value)} />
            </div>
          ) : null}
          <div className="md:col-span-2">
            <label className="form-label" htmlFor="adminRemarks">Admin Remarks</label>
            <textarea id="adminRemarks" rows={4} className="form-input" value={form.adminRemarks} onChange={(event) => update("adminRemarks", event.target.value)} />
          </div>
        </div>

        <div className="mt-5 flex justify-end gap-2">
          <button type="button" className="btn-secondary" onClick={onClose}>Cancel</button>
          <button type="submit" className="btn-primary" disabled={saving}>{saving ? "Saving..." : "Save Action"}</button>
        </div>
      </form>
    </div>
  );
};

export default CareerApplicationStatusModal;
