import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Toaster } from "react-hot-toast";
import DashboardTab from "../../components/DashboardTab";
import { useAuth } from "../../context/authContext";
import { Menu, Modal } from "react-daisyui";
import { getOrder } from "../../api/orderApi";
import moment from "moment";

const Order = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (auth?.user) {
      const getOrders = async () => {
        const res = await getOrder();
        setOrders(res);
      };
      getOrders();
    }
  }, [auth?.user]);

  return (
    <Layout title={"My Orders"}>
      <Toaster />
      <DashboardTab />
      <div className="md:w-[80%] block mx-auto">My Orders</div>
      <div className="flex w-full justify-center p-4 items-center font-sans component-preview">
        <div className="grid md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-7">
          {orders && orders.length > 0 ? (
            orders?.map((order) => (
              <Menu key={order._id} className="">
                {/* <Menu.Item>Order </Menu.Item> */}
                <ul className="menu w-56 p-2 bg-slate-100 px-5">
                  <li className="menu-title">
                    <span className="p-0 mt-2">Details</span>
                  </li>
                  <li>
                    <p className="p-0">{order?.details?.name}</p>
                    <p className="p-0">{order?.details?.email}</p>
                    <p className="p-0">{order?.details?.address}</p>
                    <p className="p-0">{order?.details?.phone}</p>
                  </li>
                  <li className="menu-title">
                    <span className="p-0 mt-2">Items</span>
                  </li>
                  {order?.items?.map((item) => (
                    <div key={item._id} className="p-0 mt-1">
                      <p className="p-0">{item?.product?.name}</p>
                      <div className="flex justify-between">
                        <p className="p-0 text-sm">RM {item?.product?.price}</p>
                        <p className="p-0 text-sm"> x {item?.cartqty}</p>
                      </div>
                    </div>
                  ))}
                  <li className="menu-title">
                    <span className="p-0 mt-2">total</span>
                  </li>
                  <li>
                    <span className="font-medium">RM{order?.total}</span>
                  </li>
                  <li className="menu-title">
                    <span className="p-0 mt-2">status</span>
                  </li>
                  <li>
                    <span>{order?.status}</span>
                  </li>
                  <li>
                    <span className="text-xs">
                      {moment(order?.createdAt).fromNow()}
                    </span>
                  </li>
                </ul>
              </Menu>
            ))
          ) : (
            <p className="text-center">No Order Found</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Order;
