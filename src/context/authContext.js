import axios from "axios";
import localforage from "localforage";
import { useState, useEffect, useContext, createContext } from "react";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  axios.defaults.headers.common["x-auth-token"] = auth?.token;
  useEffect(() => {
    const getUser = async () => {
      const data = await localforage.getItem("user");
      if (data) {
        const savedUser = JSON.parse(data);
        setAuth({
          ...auth,
          user: savedUser.user,
          token: savedUser.token,
        });
      }
    };
    getUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
