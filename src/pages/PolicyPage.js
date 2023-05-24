import React from "react";
import Layout from "../components/Layout";

const PolicyPage = () => {
  return (
    <Layout title={"Policy"}>
      <div className="flex flex-col text-center justify-center py-[4%] items-center">
        <h1 className="text-3xl font-semibold">Private Policy</h1>
        <p className="text-sm mb-7">
          Lorem ipsum dolor sit amet consectetur adipisicing elit
        </p>
        <div className="sm:w-[60%] px-5">
          <div>
            <p className="text-xl font-medium">Whatever</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
              dolore! Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Nemo vero possimus id eius ex cum! sit amet consectetur
              adipisicing elit. Repellat, dolore! Lorem ipsum dolor sit
            </p>
          </div>
          <div className="my-12">
            <p className="text-xl font-medium">Changes</p>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat,
              dolore! Lorem . You should check this Policy each time you access
              our website so as to be aware of the most recent applicable
              version of the Policy.
            </p>
          </div>
          <div>
            <p className="text-xl font-medium">Complaint</p>
            <p>
              Amet consectetur adipisicing elit. Repellat, dolore! Lorem
              adipisicing elit.If you are not satisfied with the way in which we
              handle your enquiry or complaint, please don’t hesitate to contact
              Customer Service.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PolicyPage;
