import { createContext, useContext, useEffect, useMemo, useState } from "react";
import api from "../api/axiosInstance.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(() => {
    const saved = localStorage.getItem("cms_admin");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(Boolean(localStorage.getItem("cms_token")));

  useEffect(() => {
    const token = localStorage.getItem("cms_token");
    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/admin/auth/me")
      .then(({ data }) => {
        setAdmin(data.data);
        localStorage.setItem("cms_admin", JSON.stringify(data.data));
      })
      .catch(() => {
        localStorage.removeItem("cms_token");
        localStorage.removeItem("cms_admin");
        setAdmin(null);
      })
      .finally(() => setLoading(false));
  }, []);

  const login = async (payload) => {
    const { data } = await api.post("/admin/auth/login", payload);
    localStorage.setItem("cms_token", data.data.token);
    localStorage.setItem("cms_admin", JSON.stringify(data.data.admin));
    setAdmin(data.data.admin);
    return data;
  };

  const logout = () => {
    localStorage.removeItem("cms_token");
    localStorage.removeItem("cms_admin");
    setAdmin(null);
  };

  const value = useMemo(
    () => ({
      admin,
      loading,
      isAuthenticated: Boolean(admin && localStorage.getItem("cms_token")),
      login,
      logout
    }),
    [admin, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
