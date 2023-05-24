import React, { useState } from "react";
import { Form, Button, Card, Hero, Input } from "react-daisyui";
import toast, { Toaster } from "react-hot-toast";
import { login } from "../../api/authApi";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { invalidEmail } from "../../utils/userValidation";
import { useAuth } from "../../context/authContext";
import localforage from "localforage";

const Login = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [auth, setAuth] = useAuth();
  const redirect = useNavigate();
  const location = useLocation();

  const onChangeHandler = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onsubmithandler = async (e) => {
    e.preventDefault();
    const { email, password } = user;

    if (!email || !password) {
      toast.error("All fields are required");
      return;
    }
    const emailInvalid = invalidEmail(email);
    if (emailInvalid) return toast.error(invalidEmail);

    try {
      const res = await login(user);
      if (res.success) {
        toast.success("Welcome back", { duration: 3000 });
        setAuth({
          ...auth,
          user: res.user,
          token: res.token,
        });
        const user = await localforage.getItem("user");
        if (!user) {
          const savedUser = {
            token: res.token,
            user: res.user,
          };
          await localforage.setItem("user", JSON.stringify(savedUser));
        }
        redirect(location.state || "/");
      } else {
        toast.error("Something went wrong...");
      }
    } catch (error) {
      // alert(error.response.data.msg);
      toast.error(error.response.data.msg || "Something went wrong...");
    }
  };

  return (
    <div className="py-7 px-3 md:px-10">
      <Toaster />
      <Button
        className="bg-slate-800 border-none"
        onClick={() => redirect("/")}
      >
        Back to homepage
      </Button>
      <div className="flex justify-center items-center md:min-h-[80vh]">
        <Hero>
          <Hero.Content className="flex-col lg:flex-row-reverse p-0">
            <div className="text-center lg:text-left">
              <h1 className="text-5xl font-bold">Login now!</h1>
              <p className="pt-6 pb-3">
                Provident cupiditate voluptatem et in. Quaerat fugiat ut
                assumenda excepturi exercitationem quasi. In deleniti eaque aut
                repudiandae et a id nisi.
              </p>
            </div>
            <Card className="w-full border-0 max-w-sm shadow-2xl bg-base-100">
              <Card.Body>
                <Form onSubmit={onsubmithandler}>
                  <Form.Label title="Email" />
                  <Input
                    onChange={onChangeHandler}
                    type="text"
                    placeholder="email"
                    className="input-bordered"
                    name="email"
                  />
                  <Form.Label title="Password" />
                  <Input
                    onChange={onChangeHandler}
                    type="password"
                    placeholder="password"
                    className="input-bordered"
                    name="password"
                  />
                  <label className="label">
                    <Link
                      to="/register"
                      className="label-text-alt text-zinc-400 underline hover:no-underline"
                    >
                      Dont have account? Sign up now
                    </Link>
                  </label>
                  <Button className="mt-6 bg-slate-950 text-white hover:bg-transparent hover:text-slate-950">
                    {/* {isLoading ? <ClipLoader color="#707675" /> : "Login"} */}
                    Login
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

export default Login;
