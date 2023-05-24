import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Toaster, toast } from "react-hot-toast";
import ADashboardTab from "../../components/ADashboardTab";
import { useAuth } from "../../context/authContext";
import { Table } from "react-daisyui";
import {
  getAllOrder,
  getOrderByStatus,
  updateOrderStatus,
} from "../../api/orderApi";
import moment from "moment";
import OrderModal from "../../components/modal/OrderModal";
import { RiMoreFill } from "react-icons/ri";
import { Select } from "antd";
const { Option } = Select;

const AUser = () => {
  const [auth] = useAuth();
  const [orders, setOrders] = useState([]);
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState({});
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    if (auth?.user) {
      getOrders();
    }
  }, [auth?.user]);

  useEffect(() => {
    if (filterStatus === "All") {
      getOrders();
    } else {
      const filteredOrder = async () => {
        const res = await getOrderByStatus(filterStatus);
        setOrders(res);
      };
      filteredOrder();
    }
  }, [filterStatus]);

  const getOrders = async () => {
    const res = await getAllOrder();
    setOrders(res);
  };
  const updateStatus = async (val, id) => {
    const res = await updateOrderStatus(id, val);
    toast.success(res.msg);
    getOrders();
  };
  console.log(orders);
  console.log("status", filterStatus);

  return (
    <Layout title={"Manage Order"}>
      <Toaster />
      <ADashboardTab />
      <div className="md:w-[70%] block mx-auto">
        <h1>Manage Order</h1>
        <Select
          bordered={false}
          placeholder="Select status"
          size="large"
          className="w-fit"
          onChange={(e) => setFilterStatus(e)}
          value={filterStatus}
        >
          <Option value={"All"}>All status</Option>
          <Option value={"pending"}>pending</Option>
          <Option value={"in progress"}>in progress</Option>
          <Option value={"completed"}>completed</Option>
        </Select>
        <div className="overflow-x-auto flex justify-center">
          <Table>
            <Table.Head>
              <span>No .</span>
              <span>Items</span>
              <span>Status</span>
              <span>Order Placed</span>
              <span>Amount</span>
              <span />
            </Table.Head>

            <Table.Body>
              {orders && orders.length > 0 ? (
                orders?.map((order, i) => (
                  <Table.Row key={order?._id}>
                    <span>{i + 1}</span>
                    <span>
                      <img
                        className="max-h-[100px]"
                        alt={order?.items[0]?.product?.name}
                        src={`https://ecom-backend-service.onrender.com/products/img/${order?.items[0]?.product?._id}`}
                      />
                    </span>
                    <span>
                      <Select
                        bordered={false}
                        placeholder={order.status}
                        size="small"
                        onChange={(e) => updateStatus(e, order._id)}
                        value={order?.status}
                      >
                        <Option value={"pending"}>pending</Option>
                        <Option value={"in progress"}>in progress</Option>
                        <Option value={"completed"}>completed</Option>
                      </Select>
                    </span>
                    <span>{moment(order?.createdAt).fromNow()}</span>
                    <span>{order?.total}</span>
                    <span>
                      <RiMoreFill
                        onClick={() => {
                          setVisible(!visible);
                          setSelected(order);
                        }}
                        className="text-gray-950"
                      />
                    </span>
                  </Table.Row>
                ))
              ) : (
                <Table.Row>
                  <span />
                  <span />
                  <span>No order found</span>
                  <span />
                  <span />
                </Table.Row>
              )}
            </Table.Body>
          </Table>
          <OrderModal
            order={selected}
            visible={visible}
            setVisible={setVisible}
          />
        </div>
      </div>
    </Layout>
  );
};

export default AUser;
