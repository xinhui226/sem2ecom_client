import React from "react";
import { useLocation } from "react-router-dom";
const ADashboardTab = () => {
  const location = useLocation();
  const path = location.pathname;
  // console.log(path);
  return (
    <div className="dashboard-tab w-full flex justify-center my-5">
      <div className="tabs">
        <a
          className={`tab tab-bordered tab-md ${
            path === "/dashboard/admin" && "tab-active"
          }`}
          href="/dashboard/admin"
        >
          Dashboard
        </a>
        <a
          className={`tab tab-bordered tab-md ${
            path === "/dashboard/admin/addcategory" && "tab-active"
          }`}
          href="/dashboard/admin/addcategory"
        >
          Categories
        </a>
        <a
          className={`tab tab-bordered tab-md ${
            path === "/dashboard/admin/products" && "tab-active"
          }`}
          href="/dashboard/admin/products"
        >
          Products
        </a>
        <a
          className={`tab tab-bordered tab-md ${
            path === "/dashboard/admin/order" && "tab-active"
          }`}
          href="/dashboard/admin/order"
        >
          Orders
        </a>
      </div>
    </div>
  );
};

export default ADashboardTab;
