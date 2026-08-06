import { Menu, Search } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const Header = ({ onMenu }) => {
  const { admin } = useAuth();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur lg:px-6">
      <div className="flex items-center gap-3">
        <button type="button" onClick={onMenu} className="btn-secondary p-2 lg:hidden" aria-label="Open menu">
          <Menu size={18} />
        </button>
        <div className="hidden items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-500 md:flex">
          <Search size={16} />
          Manage websites, media, content, and enquiries
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-right">
          <p className="text-sm font-semibold text-slate-900">{admin?.name || "Admin"}</p>
          <p className="text-xs text-slate-500">{admin?.email}</p>
        </div>
        <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-900 text-sm font-bold text-white">
          {(admin?.name || "A").slice(0, 1).toUpperCase()}
        </div>
      </div>
    </header>
  );
};

export default Header;
