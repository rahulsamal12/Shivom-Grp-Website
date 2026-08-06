import { Menu, BookOpen } from "lucide-react";
import { useAuth } from "../context/AuthContext.jsx";

const Header = ({ onMenu }) => {
  const { admin } = useAuth();

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur lg:px-6">
      <div className="flex items-center gap-3">
        <button type="button" onClick={onMenu} className="btn-secondary p-2 lg:hidden" aria-label="Open menu">
          <Menu size={18} />
        </button>
        {/*
          Global search is intentionally hidden for now.
          Module-level search remains available on list pages where it is functional.
        */}
      </div>

      <div className="flex items-center gap-4">
        <a
          href="/docs/admin-documentation.html"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-secondary h-9 px-3 text-xs"
          title="Open admin user guide"
        >
          <BookOpen size={15} />
          <span className="hidden sm:inline">Documentation</span>
          <span className="inline sm:hidden">Docs</span>
        </a>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-semibold text-slate-900">{admin?.name || "Admin"}</p>
            <p className="text-xs text-slate-500">{admin?.email}</p>
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-md bg-slate-900 text-sm font-bold text-white">
            {(admin?.name || "A").slice(0, 1).toUpperCase()}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
