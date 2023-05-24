import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { invalidEmail } from "../utils/userValidation";
import { toast } from "react-hot-toast";
import { Button, Form, Input } from "react-daisyui";
import { sendMail } from "../utils/sendMail";
import axios from "axios";

const Contactpage = () => {
  const [message, setMessage] = useState({
    email: "",
    subject: "",
    content: "",
  });
  const [canSubmit, setCanSubmit] = useState(false);
  const [validEmailFormat, setValidEmailFormat] = useState(true);

  const onchange = (e) => {
    setMessage({ ...message, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const { email, subject, content } = message;
    const valid = invalidEmail(email, "", "");
    if (valid) setValidEmailFormat(false);
    else setValidEmailFormat(true);
    if (validEmailFormat && email && subject && content) setCanSubmit(true);
    else setCanSubmit(false);
  }, [message, validEmailFormat]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const { email, subject, content } = message;
    if (!email || !subject || !content)
      return toast.error("Please fill in all the fields");

    const res = await axios.post("http://localhost:7100/sendMail", {
      email,
      subject,
      content,
    });
    if (res.status === 200) {
      toast.success("Message sent successfully");
      setMessage({
        email: "",
        subject: "",
        content: "",
      });
    } else return toast.error("Somthing went wrong, please try again");
  };

  return (
    <Layout title={"Contact us"}>
      <div className="flex flex-col text-center justify-center py-[4%] items-center">
        <h1 className="text-3xl font-semibold">Contact Us</h1>
        <p className="text-lg mb-4">Got question for us?</p>
        <div className="md:flex justify-evenly gap-4 md:w-[50%] items-center">
          <div>
            <div className="text-left">
              <p className="text-xl mb-5 font-medium">Contact Information</p>
              <p>Online Store</p>
              <p>123 Jalan ABC</p>
              <p>Lebuh Whatever</p>
              <p>00100 Georgetown,</p>
              <p>Pulau Pinang,</p>
              <p>Malaysia</p>
            </div>
            <div className="my-5 text-left">
              <p className="text-xl font-medium">Contact Number</p>
              <p>+602-2222222</p>
            </div>
            <div className="text-left">
              <p className="text-xl font-medium">Email</p>
              <p>feedback@example.com</p>
            </div>
          </div>
          <img
            className="max-w-[310px] max-h-[350px]"
            src="https://images.pexels.com/photos/7709287/pexels-photo-7709287.jpeg?auto=compress&cs=tinysrgb"
            alt="contact"
          />
        </div>
        <hr />
        <div className="py-5">
          <h1 className="text-lg font-semibold">Leave us a message</h1>
          <Form onSubmit={submitHandler}>
            <div className="mb-4">
              <Form.Label title="Email" />
              <Input
                className={`w-full text-slate-700 ${
                  !validEmailFormat && "input-error"
                }`}
                placeholder="jsmith@example.com"
                name="email"
                onChange={onchange}
                value={message.email}
              />
              {!validEmailFormat && (
                <span className="label-text-alt text-error">
                  Invalid email format
                </span>
              )}
            </div>
            <div className="mb-4">
              <Form.Label title="Subject" />
              <Input
                className="w-full text-slate-700"
                placeholder="Issue about..."
                name="subject"
                onChange={onchange}
                value={message.subject}
              />
            </div>
            <div className="mb-4">
              <Form.Label title="Content" />
              <textarea
                className="textarea-lg w-full rounded-lg form-control text-slate-700 textarea textarea-bordered"
                name="content"
                placeholder="About your message"
                onChange={onchange}
                value={message.content}
              ></textarea>
            </div>
            <Button
              className="bg-black text-white hover:bg-slate-950"
              disabled={!canSubmit}
              onClick={submitHandler}
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    </Layout>
  );
};

export default Contactpage;
