import React, { useState } from "react";
import { Button, Card, Form, Hero, Input } from "react-daisyui";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { register } from "../../api/authApi";
import { useNavigate } from "react-router-dom";
import { invalidEmail } from "../../utils/userValidation";
const Register = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
    phone: "",
  });
  const redirect = useNavigate();

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onsubmithandler = async (e) => {
    e.preventDefault();
    const { name, email, password, phone, cpassword } = user;

    if (!name || !email || !password || !phone || !cpassword) {
      toast.error("All fields are required");
      return;
    }
    if (name.length < 8)
      return toast.error("Name should be at least 8 characters");
    if (password.length < 8)
      return toast.error("Password should be at least 8 characters");
    if (password !== cpassword) {
      toast.error("Passwords do not match");
      return;
    }

    const emailInvalid = invalidEmail(email);
    if (emailInvalid) return toast.error(invalidEmail);

    const registerData = {
      name,
      email,
      password,
      phone: phone,
    };
    try {
      const res = await register(registerData);
      if (res.success) {
        toast.success("Account created successfully");
        redirect("/login");
      } else {
        toast.error(res.msg);
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };
  return (
    <div className="py-7 px-3 md:px-10">
      <Toaster />
      <Button
        className="bg-slate-800 border-none mb-4"
        onClick={() => redirect("/")}
      >
        Back to homepage
      </Button>
      <div className="flex justify-center items-center md:min-h-[80vh]">
        <Hero>
          <Hero.Content className="flex-col lg:flex-row-reverse p-0">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Sign up now!</h1>
              <p className="pt-6 pb-3">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
            </div>
            <Card className="w-full border-0 max-w-sm shadow-2xl bg-base-100">
              <Card.Body>
                <Form onSubmit={onsubmithandler}>
                  <Form.Label title="Name" />
                  <Input
                    onChange={onChangeHandler}
                    name="name"
                    type="text"
                    placeholder="name"
                    className="input-bordered"
                  />
                  <Form.Label title="Email" />
                  <Input
                    onChange={onChangeHandler}
                    name="email"
                    type="text"
                    placeholder="email"
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
                    name="cpassword"
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
                    className="input-bordered"
                  />
                  <label className="label">
                    <Link
                      to="/login"
                      className="label-text-alt text-zinc-400 underline hover:no-underline"
                    >
                      Already have account? Log in now
                    </Link>
                  </label>
                  <Button className="mt-6 bg-slate-950 text-white hover:bg-transparent hover:text-slate-950">
                    Sign up
                  </Button>
                </Form>
              </Card.Body>
            </Card>
          </Hero.Content>
        </Hero>
      </div>
    </div>
  );
};

export default Register;
