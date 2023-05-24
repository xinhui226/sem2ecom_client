import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Outlet } from "react-router-dom";
import { checkIsAdmin } from "../api/authApi";
import Loading from "./Loading";

export default function AdminRoute() {
  const [pass, setPass] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const check = async () => {
      const res = await checkIsAdmin();
      if (res.pass) setPass(true);
      else setPass(false);
    };
    if (auth?.token) check();
  }, [auth?.token]);

  return pass ? <Outlet /> : <Loading path="" />;
}
