import { useState, useEffect } from "react";
import { useAuth } from "../context/authContext";
import { Outlet } from "react-router-dom";
import { checkAuth } from "../api/authApi";
import Loading from "./Loading";

export default function UserRoute() {
  const [pass, setPass] = useState(false);
  const [auth, setAuth] = useAuth();

  useEffect(() => {
    const check = async () => {
      const res = await checkAuth();
      if (res.pass) setPass(true);
      else setPass(false);
    };
    if (auth?.token) check();
  }, [auth?.token]);

  return pass ? <Outlet /> : <Loading />;
}
