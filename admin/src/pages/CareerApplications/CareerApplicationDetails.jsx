import { ArrowLeft, Download, Eye, Save } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useParams } from "react-router-dom";
import api from "../../api/axiosInstance.js";
import CareerApplicationStatusModal, { applicationStatuses } from "./CareerApplicationStatusModal.jsx";
import { StatusBadge, useResumeActions } from "./CareerApplicationsList.jsx";

const formatDate = (value) => (value ? new Date(value).toLocaleString() : "-");
const formatBytes = (bytes = 0) => {
  if (!bytes) return "-";
  if (bytes < 1024) return bytes + " B";
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
  return (bytes / (1024 * 1024)).toFixed(1) + " MB";
};

const Field = ({ label, value }) => (
  <div>
    <p className="text-xs font-bold uppercase tracking-normal text-slate-400">{label}</p>
    <p className="mt-1 text-sm font-semibold text-slate-800">{value || "-"}</p>
  </div>
);

const Section = ({ title, children }) => (
  <section className="rounded-md border border-slate-200 bg-white p-5 shadow-panel">
    <h2 className="mb-4 text-lg font-bold text-slate-950">{title}</h2>
    {children}
  </section>
);

const CareerApplicationDetails = () => {
  const { id } = useParams();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [statusModalOpen, setStatusModalOpen] = useState(false);
  const [adminForm, setAdminForm] = useState({});
  const [pdfPreviewUrl, setPdfPreviewUrl] = useState("");
  const { viewResume, downloadResume } = useResumeActions();

  const loadApplication = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/admin/career-applications/${id}`);
      setApplication(data.data);
      setAdminForm({
        status: data.data.status || "new",
        adminRemarks: data.data.adminRemarks || "",
        rejectionReason: data.data.rejectionReason || "",
        interviewDate: data.data.interviewDate ? new Date(data.data.interviewDate).toISOString().slice(0, 16) : "",
        interviewMode: data.data.interviewMode || "",
        interviewLink: data.data.interviewLink || ""
      });
    } catch (error) {
      toast.error(error.response?.data?.message || "Application failed to load");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadApplication();
  }, [id]);

  useEffect(() => {
    let objectUrl = "";
    const loadPdf = async () => {
      if (!application || application.resumeMimeType !== "application/pdf") return;
      try {
        const { data } = await api.get(`/admin/career-applications/${application._id}/resume/view`, { responseType: "blob" });
        objectUrl = window.URL.createObjectURL(new Blob([data], { type: "application/pdf" }));
        setPdfPreviewUrl(objectUrl);
      } catch {
        setPdfPreviewUrl("");
      }
    };
    loadPdf();
    return () => {
      if (objectUrl) window.URL.revokeObjectURL(objectUrl);
    };
  }, [application?._id]);

  const saveAdminFields = async () => {
    setSaving(true);
    try {
      const { data } = await api.put(`/admin/career-applications/${id}`, adminForm);
      toast.success(data.message);
      loadApplication();
    } catch (error) {
      toast.error(error.response?.data?.message || "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const patchStatus = async (payload) => {
    setSaving(true);
    try {
      const { data } = await api.patch(`/admin/career-applications/${id}/status`, payload);
      toast.success(data.message);
      setStatusModalOpen(false);
      loadApplication();
    } catch (error) {
      toast.error(error.response?.data?.message || "Status update failed");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="rounded-md border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-panel">Loading application...</div>;
  }

  if (!application) {
    return <div className="rounded-md border border-slate-200 bg-white p-8 text-center text-sm text-slate-500 shadow-panel">Application not found.</div>;
  }

  const career = application.careerId || {};

  return (
    <div className="space-y-5">
      <div className="flex flex-col justify-between gap-4 rounded-md border border-slate-200 bg-white p-5 shadow-panel md:flex-row md:items-center">
        <div>
          <Link to="/career-applications" className="mb-2 inline-flex items-center gap-2 text-sm font-semibold text-brand-700"><ArrowLeft size={15} /> Back to applications</Link>
          <h1 className="text-2xl font-bold text-slate-950">{application.applicantName}</h1>
          <p className="mt-1 text-sm text-slate-500">{application.jobTitle} - Applied {formatDate(application.createdAt)}</p>
        </div>
        <StatusBadge status={application.status} />
      </div>

      <Section title="Job Details">
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Job Title" value={application.jobTitle} />
          <Field label="Website" value={application.websiteKey} />
          <Field label="Department" value={career.department} />
          <Field label="Job Type" value={career.jobType} />
          <Field label="Location" value={career.location} />
          <Field label="Applied Date" value={formatDate(application.createdAt)} />
        </div>
      </Section>

      <Section title="Applicant Details">
        <div className="grid gap-4 md:grid-cols-3">
          <Field label="Applicant Name" value={application.applicantName} />
          <Field label="Email" value={application.email} />
          <Field label="Phone" value={application.phone} />
          <Field label="Alternate Phone" value={application.alternatePhone} />
          <Field label="Current Location" value={application.currentLocation} />
          <Field label="Total Experience" value={application.totalExperience} />
          <Field label="Current Company" value={application.currentCompany} />
          <Field label="Current Salary" value={application.currentSalary} />
          <Field label="Expected Salary" value={application.expectedSalary} />
          <Field label="Notice Period" value={application.noticePeriod} />
        </div>
      </Section>

      <Section title="Resume / CV">
        <div className="grid gap-4 md:grid-cols-4">
          <Field label="Original File" value={application.resumeOriginalName} />
          <Field label="File Type" value={application.resumeMimeType} />
          <Field label="File Size" value={formatBytes(application.resumeSize)} />
          <div className="flex items-end gap-2">
            <button type="button" className="btn-secondary" onClick={() => viewResume(application)}><Eye size={16} /> View CV</button>
            <button type="button" className="btn-primary" onClick={() => downloadResume(application)}><Download size={16} /> Download</button>
          </div>
        </div>
        {application.resumeMimeType === "application/pdf" && pdfPreviewUrl ? (
          <iframe title="Resume preview" src={pdfPreviewUrl} className="mt-5 h-[620px] w-full rounded-md border border-slate-200" />
        ) : (
          <p className="mt-4 rounded-md bg-slate-50 p-4 text-sm text-slate-500">DOC/DOCX resumes are available through download.</p>
        )}
      </Section>

      <Section title="Cover Letter / Message">
        <div className="grid gap-4 md:grid-cols-2">
          <Field label="Cover Letter" value={application.coverLetter} />
          <Field label="Message" value={application.message} />
        </div>
      </Section>

      <Section title="Admin Action">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <label className="form-label">Current Status</label>
            <select className="form-input" value={adminForm.status || application.status} onChange={(event) => setAdminForm((current) => ({ ...current, status: event.target.value }))}>
              {applicationStatuses.map((status) => <option key={status.value} value={status.value}>{status.label}</option>)}
            </select>
          </div>
          <div>
            <label className="form-label">Interview Date</label>
            <input type="datetime-local" className="form-input" value={adminForm.interviewDate || ""} onChange={(event) => setAdminForm((current) => ({ ...current, interviewDate: event.target.value }))} />
          </div>
          <div>
            <label className="form-label">Interview Mode</label>
            <select className="form-input" value={adminForm.interviewMode || ""} onChange={(event) => setAdminForm((current) => ({ ...current, interviewMode: event.target.value }))}>
              <option value="">Select mode</option>
              <option value="phone">Phone</option>
              <option value="google_meet">Google Meet</option>
              <option value="zoom">Zoom</option>
              <option value="office">Office</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="form-label">Interview Link</label>
            <input className="form-input" value={adminForm.interviewLink || ""} onChange={(event) => setAdminForm((current) => ({ ...current, interviewLink: event.target.value }))} />
          </div>
          <div className="md:col-span-2">
            <label className="form-label">Admin Remarks</label>
            <textarea rows={4} className="form-input" value={adminForm.adminRemarks || ""} onChange={(event) => setAdminForm((current) => ({ ...current, adminRemarks: event.target.value }))} />
          </div>
          <div className="md:col-span-2">
            <label className="form-label">Rejection Reason</label>
            <textarea rows={3} className="form-input" value={adminForm.rejectionReason || ""} onChange={(event) => setAdminForm((current) => ({ ...current, rejectionReason: event.target.value }))} />
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" className="btn-secondary" onClick={() => setStatusModalOpen(true)}>Change Status</button>
          <button type="button" className="btn-primary" onClick={saveAdminFields} disabled={saving}><Save size={16} /> {saving ? "Saving..." : "Save Fields"}</button>
        </div>
      </Section>

      <Section title="Action History">
        {application.actionHistory?.length ? (
          <div className="space-y-3">
            {application.actionHistory.slice().reverse().map((entry, index) => (
              <div key={(entry.performedAt || "history") + "-" + index} className="rounded-md border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm font-bold text-slate-900">{entry.oldStatus || "-"} to {entry.newStatus || "-"}</p>
                <p className="mt-1 text-sm text-slate-600">{entry.remarks || "No remarks"}</p>
                <p className="mt-2 text-xs text-slate-400">{entry.performedBy?.name || entry.performedBy?.email || "Admin"} - {formatDate(entry.performedAt)}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-slate-500">No action history yet.</p>
        )}
      </Section>

      <CareerApplicationStatusModal open={statusModalOpen} application={application} saving={saving} onClose={() => setStatusModalOpen(false)} onSubmit={patchStatus} />
    </div>
  );
};

export default CareerApplicationDetails;
