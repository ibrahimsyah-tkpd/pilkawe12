import { createContext, useContext, useEffect, useState } from "react";
import api from "../helper/api";
import Cookies from "js-cookie";

const cookieKey = "user_token";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const login = async (payload) => {
    setErrorMessage("");
    try {
      const {
        data: { token },
      } = await api.post("/admin/login", payload);
      Cookies.set("user_token", token);
      api.defaults.headers.Authorization = `Bearer ${token}`;

      const { data } = await api.get("/admin/me");
      setAdmin(data);
    } catch (err) {
      setErrorMessage(err.response.data.error);
    }
    setLoading(false);
  };

  const logout = async () => {
    delete api.defaults.headers.Authorization;
    Cookies.remove("user_token");
    setAdmin(null);
  };

  useEffect(() => {
    const initAdminState = async () => {
      setErrorMessage("");
      const token = Cookies.get(cookieKey);
      if (!token) {
        setLoading(false);
        return;
      }
      api.defaults.headers.Authorization = `Bearer ${token}`;

      try {
        const { data } = await api.get("/admin/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setAdmin(data);
      } catch (err) {
        setErrorMessage(err.response.data.error);
      }
      setLoading(false);
    };

    initAdminState();
  }, []);

  const isAuthenticated = !!admin;
  return (
    <AdminContext.Provider
      value={{
        isAuthenticated,
        admin,
        loading,
        errorMessage,
        login,
        logout,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
