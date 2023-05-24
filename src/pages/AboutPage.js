import React from "react";
import Layout from "../components/Layout";

const Aboutpage = () => {
  return (
    <Layout title={"About us"}>
      <div className="flex flex-col text-center justify-center py-[4%] items-center">
        <h1 className="text-3xl font-semibold">About Us</h1>
        <p className="text-sm mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </p>
        <div className="md:flex justify-evenly gap-4 md:w-[50%] items-center">
          <div>
            <div className="text-left">
              <p className="text-xl mb-2 font-medium">Who are we</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, dolore! Lorem ipsum dolor sit amet consectetur
                adipisicing elit. Nemo vero possimus id eius ex cum!
              </p>
            </div>
            <div className="my-5 text-left">
              <p className="text-xl font-medium">Motion</p>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Repellat, dolore! Lorem
              </p>
            </div>
            <div className="text-left">
              <p className="text-xl font-medium">Vision</p>
              <p>
                Amet consectetur adipisicing elit. Repellat, dolore! Lorem
                adipisicing elit.
              </p>
            </div>
          </div>
          <img
            className="max-w-[310px] max-h-[350px]"
            src="https://images.pexels.com/photos/2066896/pexels-photo-2066896.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="contact"
          />
        </div>
      </div>
    </Layout>
  );
};

export default Aboutpage;
