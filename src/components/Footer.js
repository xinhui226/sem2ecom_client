import React from "react";
import { Footer } from "react-daisyui";
import { NavLink } from "react-router-dom";

const PageFooter = () => {
  return (
    <Footer className="p-5 bg-neutral text-neutral-content mt-5" center>
      <div className="flex">
        <NavLink className="link link-hover border-r-2 px-5" to="/about">
          About us
        </NavLink>
        <NavLink className="link link-hover border-r-2 px-5" to="/contact">
          Contact us
        </NavLink>
        <NavLink className="link link-hover" to="/policy">
          Policy
        </NavLink>
      </div>
      <p>&copy; Online Store Sdn Bhd. All right reserves</p>
    </Footer>
  );
};

export default PageFooter;
