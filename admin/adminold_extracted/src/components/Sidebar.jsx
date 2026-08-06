import {
  BookOpen,
  Building2,
  CalendarDays,
  Contact,
  FileText,
  Gauge,
  Award,
  Images,
  LayoutDashboard,
  LogOut,
  MessageSquareQuote,
  Newspaper,
  PanelTop,
  Settings,
  Users
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

const navItems = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/websites", label: "Websites", icon: Building2 },
  { to: "/sliders", label: "Sliders", icon: Images },
  { to: "/pages", label: "Group Pages", icon: FileText },
  { to: "/landing-sections", label: "Landing Sections", icon: PanelTop },
  { to: "/projects", label: "Projects", icon: BookOpen },
  { to: "/testimonials", label: "Testimonials", icon: MessageSquareQuote },
  { to: "/events", label: "Events", icon: CalendarDays },
  { to: "/awards-certifications", label: "Awards & Certifications", icon: Award },
  { to: "/team", label: "Team", icon: Users },
  { to: "/blogs", label: "Blogs / News", icon: Newspaper },
  { to: "/contacts", label: "Contacts", icon: Contact },
  { to: "/settings", label: "Settings", icon: Settings }
];

const Sidebar = ({ open, onClose }) => {
  const { logout } = useAuth();

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-slate-950/40 lg:hidden ${open ? "block" : "hidden"}`}
        onClick={onClose}
        aria-hidden="true"
      />
      <aside
        className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-brand-600 text-white">
            <Gauge size={22} />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-950">Group CMS</p>
            <p className="text-xs text-slate-500">Admin Panel</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto p-3">
          {navItems.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={onClose}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-semibold transition ${
                  isActive ? "bg-brand-50 text-brand-700" : "text-slate-600 hover:bg-slate-50 hover:text-slate-950"
                }`
              }
            >
              <Icon size={18} />
              <span>{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-slate-200 p-3">
          <button type="button" onClick={logout} className="btn-secondary w-full">
            <LogOut size={17} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
