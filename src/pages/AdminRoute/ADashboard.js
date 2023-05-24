import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import toast, { Toaster } from "react-hot-toast";
import ADashboardTab from "../../components/ADashboardTab";
import { useAuth } from "../../context/authContext";
import { updateUser } from "../../api/authApi";
import localforage from "localforage";
import { invalidEmail } from "../../utils/userValidation";
import { Button, Form, Input } from "react-daisyui";

const ADashboard = () => {
  const [auth, setAuth] = useAuth();
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    newPassword: "",
  });

  useEffect(() => {
    if (auth?.user) {
      const { email, name, phone } = auth?.user;
      setUser({ ...user, email, name, phone });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.user]);

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onsubmithandler = (e) => {
    e.preventDefault();
    const { name, email, password, phone, newPassword } = user;

    if (name.length < 8)
      return toast.error("Name should be at least 8 characters");
    if (newPassword && newPassword.length < 8)
      return toast.error("Password should be at least 8 characters");

    const emailInvalid = invalidEmail(email);
    if (emailInvalid) return toast.error(invalidEmail);

    const updateData = {
      name,
      email,
      phone: parseInt(phone),
    };

    if (password && newPassword) {
      updateData.password = password;
      updateData.newPassword = newPassword;
    }

    try {
      const getData = async () => {
        const res = await updateUser(updateData);
        setAuth({ ...auth, user: res.user });
        const updLocal = async () => {
          let u = await localforage.getItem("user");
          u = JSON.parse(u);
          u.user = res.user;
          await localforage.setItem("user", JSON.stringify(u));
        };
        updLocal();
      };
      getData();
      toast.success("Profile updated successfully");
    } catch (error) {
      console.error(error);
      toast.error(error.response.data.msg);
    }
  };

  return (
    <Layout title={"Dashboard"}>
      <Toaster />
      <ADashboardTab />
      <div className="md:w-[50%] block mx-auto">
        <h1>Profile</h1>
        <Form onSubmit={onsubmithandler}>
          <Form.Label title="Name" />
          <Input
            onChange={onChangeHandler}
            name="name"
            type="text"
            placeholder="name"
            value={user.name}
            className="input-bordered"
          />
          <Form.Label title="Email" />
          <Input
            onChange={onChangeHandler}
            name="email"
            type="text"
            placeholder="email"
            value={user.email}
            disabled
            className="input-bordered"
          />
          <Form.Label title="Password" />
          <Input
            onChange={onChangeHandler}
            name="password"
            type="password"
            placeholder="password"
            className="input-bordered"
          />
          <Form.Label title="Confirm Password" />
          <Input
            onChange={onChangeHandler}
            name="newPassword"
            type="password"
            placeholder="confirm password"
            className="input-bordered"
          />
          <Form.Label title="Phone" />
          <Input
            onChange={onChangeHandler}
            name="phone"
            type="text"
            placeholder="6012-3456789"
            value={user.phone}
            className="input-bordered"
          />
          <Button className="mt-6 border-none w-fit block mx-auto bg-slate-400">
            Update
          </Button>
        </Form>
      </div>
    </Layout>
  );
};

export default ADashboard;
