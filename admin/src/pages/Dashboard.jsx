import {
  BookOpen,
  BriefcaseBusiness,
  CalendarDays,
  Contact,
  Award,
  Images,
  Megaphone,
  Handshake,
  Newspaper,
  Send,
  Package,
  BadgePercent,
} from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axiosInstance.js";

const metricMap = [
  ["totalSliders", "Total sliders", Images],
  ["totalProjects", "Total projects", BookOpen],
  ["totalEvents", "Total events", CalendarDays],
  ["totalAwardsCertifications", "Awards & certifications", Award],
  ["totalBlogs", "Total blogs/news", Newspaper],
  ["totalContactEnquiries", "Contact enquiries", Contact],
  ["totalCareers", "Total careers", BriefcaseBusiness],
  ["activeCareers", "Active careers", BriefcaseBusiness],
  ["totalCareerApplications", "Total applications", Send],
  ["newCareerApplications", "New applications", Send],
  ["shortlistedCareerApplications", "Shortlisted", Send],
  ["interviewScheduledCareerApplications", "Interview scheduled", Send],
  ["hiredCareerApplications", "Hired applications", Send],
  ["totalAdvertisements", "Advertisements", Megaphone],
  ["activeAdvertisements", "Active advertisements", Megaphone],
  ["totalClientPartners", "Total clients/partners", Handshake],
  ["totalSolarProducts", "Total solar products", Package],
  ["activeSolarProducts", "Active solar products", Package],
  ["featuredSolarProducts", "Featured solar products", Package],
  ["totalSolarPromotions", "Total solar promotions", BadgePercent],
  ["activeSolarPromotions", "Active solar promotions", BadgePercent]
];

const Dashboard = () => {
  const [counts, setCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/admin/dashboard")
      .then(({ data }) => setCounts(data.data))
      .catch((error) => toast.error(error.response?.data?.message || "Dashboard failed to load"))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-6">
      <div className="rounded-md border border-slate-200 bg-white p-6 shadow-panel">
        <h1 className="text-2xl font-bold text-slate-950">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">CMS overview for the group website and company landing pages.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metricMap.map(([key, label, Icon]) => (
          <div key={key} className="rounded-md border border-slate-200 bg-white p-5 shadow-panel">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold text-slate-500">{label}</p>
                <p className="mt-2 text-3xl font-bold text-slate-950">{loading ? "..." : counts[key] || 0}</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-md bg-brand-50 text-brand-700">
                <Icon size={22} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
