import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import AdminLayout from "./components/Layout/AdminLayout.jsx";
import Login from "./pages/Login.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import Websites from "./pages/Websites/index.jsx";
import Sliders from "./pages/Sliders/index.jsx";
import Pages from "./pages/Pages/index.jsx";
import LandingSections from "./pages/LandingSections/index.jsx";
import Projects from "./pages/Projects/index.jsx";
import Testimonials from "./pages/Testimonials/index.jsx";
import Events from "./pages/Events/index.jsx";
import AwardsCertifications from "./pages/AwardsCertifications/index.jsx";
import Team from "./pages/Team/index.jsx";
import Blogs from "./pages/Blogs/index.jsx";
import Contacts from "./pages/Contacts/index.jsx";
import Settings from "./pages/Settings/index.jsx";
import Careers from "./pages/Careers/index.jsx";
import CareerApplications from "./pages/CareerApplications/index.jsx";
import CareerApplicationDetails from "./pages/CareerApplications/CareerApplicationDetails.jsx";
import Advertisements from "./pages/Advertisements/index.jsx";
import ClientPartners from "./pages/ClientPartners/index.jsx";
import SolarProductsList from "./pages/SolarProducts/SolarProductsList.jsx";
import SolarPromotionsList from "./pages/SolarPromotions/SolarPromotionsList.jsx";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route element={<AdminLayout />}>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/websites" element={<Websites />} />
          <Route path="/sliders" element={<Sliders />} />
          <Route path="/pages" element={<Pages />} />
          <Route path="/landing-sections" element={<LandingSections />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/testimonials" element={<Testimonials />} />
          <Route path="/events" element={<Events />} />
          <Route path="/awards-certifications" element={<AwardsCertifications />} />
          <Route path="/team" element={<Team />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/career-applications" element={<CareerApplications />} />
          <Route path="/career-applications/:id" element={<CareerApplicationDetails />} />
          <Route path="/admin/career-applications" element={<CareerApplications />} />
          <Route path="/admin/career-applications/:id" element={<CareerApplicationDetails />} />
          <Route path="/advertisements" element={<Advertisements />} />
          <Route path="/client-partners" element={<ClientPartners />} />
          <Route path="/solar-products" element={<SolarProductsList />} />
          <Route path="/solar-promotions" element={<SolarPromotionsList />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Route>
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  </BrowserRouter>
);

export default App;
