import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Header from "../Header.jsx";
import Sidebar from "../Sidebar.jsx";
import AnimatedLayout from "./AnimatedLayout.jsx";

const AdminLayout = () => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth >= 1024 : false
  );

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="min-w-0 flex-1">
        <Header onMenu={() => setSidebarOpen((current) => !current)} />
        <main className="px-4 py-6 lg:px-8">
          <AnimatePresence mode="wait">
            <AnimatedLayout key={location.pathname}>
              <Outlet />
            </AnimatedLayout>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
