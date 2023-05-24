import axios from "axios";
import localforage from "localforage";

export const register = async (user) => {
  const res = await axios.post(
    "https://ecom-backend-service.onrender.com/auth/register",
    user
  );
  return res.data;
};

export const login = async (user) => {
  const res = await axios.post(
    "https://ecom-backend-service.onrender.com/auth/login",
    user
  );
  if (res.data.success) {
    const savedUser = {
      token: res.data.token,
      user: res.data.user,
    };
    await localforage.setItem("user", JSON.stringify(savedUser));
  }
  console.log("inside", res.data);
  return res.data;
};

export const checkAuth = async () => {
  const res = await axios.get(
    "https://ecom-backend-service.onrender.com/auth/user"
  );
  return res.data;
};

export const checkIsAdmin = async () => {
  const res = await axios.get(
    "https://ecom-backend-service.onrender.com/auth/admin"
  );
  return res.data;
};

export const updateUser = async (userdata) => {
  const res = await axios.put(
    "https://ecom-backend-service.onrender.com/auth/update",
    userdata
  );
  return res.data;
};
