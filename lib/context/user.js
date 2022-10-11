import { createContext, useState } from "react";
import api from "../helper/api";

const cookieKey = "user_token";
const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");

  const auth = async (nik) => {
    try {
      const { data: valid } = await api.get(`/voter/check?nik=${nik}`);
      if (!valid) {
        setErrorMessage("NIK Tidak Ditemukan");
        return;
      }

      const { data: user } = await api.get();
    } catch (err) {
      setErrorMessage(err.response.data.error);
    }
  };
};
