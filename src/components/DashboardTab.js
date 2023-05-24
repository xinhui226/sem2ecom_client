import React from "react";
import { useLocation } from "react-router-dom";
const DashboardTab = () => {
  const location = useLocation();
  const path = location.pathname;
  return (
    <div className="dashboard-tab w-full flex justify-center my-5">
      <div className="tabs">
        <a
          className={`tab tab-bordered tab-md ${
            path === "/dashboard/user" && "tab-active"
          }`}
          href="/dashboard/user"
        >
          Profile
        </a>
        <a
          className={`tab tab-bordered tab-md ${
            path === "/dashboard/user/order" && "tab-active"
          }`}
          href="/dashboard/user/order"
        >
          Orders
        </a>
      </div>
    </div>
  );
};

export default DashboardTab;
