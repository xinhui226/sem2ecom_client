import axios from "axios";
import localforage from "localforage";

export const register = async (user) => {
  const res = await axios.post("http://localhost:7100/auth/register", user);
  return res.data;
};

export const login = async (user) => {
  const res = await axios.post("http://localhost:7100/auth/login", user);
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
  const res = await axios.get("http://localhost:7100/auth/user");
  return res.data;
};

export const checkIsAdmin = async () => {
  const res = await axios.get("http://localhost:7100/auth/admin");
  return res.data;
};

export const updateUser = async (userdata) => {
  const res = await axios.put("http://localhost:7100/auth/update", userdata);
  return res.data;
};
