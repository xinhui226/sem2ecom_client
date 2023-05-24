import axios from "axios";

export const getOrder = async () => {
  const res = await axios.get("http://localhost:7100/orders");
  return res.data;
};

export const getAllOrder = async () => {
  const res = await axios.get("http://localhost:7100/orders/all");
  return res.data;
};

export const getOrderByStatus = async (status) => {
  const res = await axios.get("http://localhost:7100/orders/status/" + status);
  return res.data;
};

export const updateOrderStatus = async (id, status) => {
  const res = await axios.put("http://localhost:7100/orders/" + id, {
    status,
  });
  return res.data;
};
