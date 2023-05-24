import React from "react";
import Layout from "../components/Layout";
import { Button } from "react-daisyui";

const CancelPage = () => {
  return (
    <Layout title={"Cancel payment"}>
      <div className="w-full h-full pt-[8%] items-center justify-center text-center">
        <h1 className="text-9xl">Ooops...</h1>
        <p>Payment has been cancelled</p>
        <Button className="bg-slate-800 rounded-sm mt-3 btn-sm">
          <a href="/">Go back to homepage</a>
        </Button>
      </div>
    </Layout>
  );
};

export default CancelPage;
