import axios from "axios";

export const getOrder = async () => {
  const res = await axios.get(
    "https://ecom-backend-service.onrender.com/orders"
  );
  return res.data;
};

export const getAllOrder = async () => {
  const res = await axios.get(
    "https://ecom-backend-service.onrender.com/orders/all"
  );
  return res.data;
};

export const getOrderByStatus = async (status) => {
  const res = await axios.get(
    "https://ecom-backend-service.onrender.com/orders/status/" + status
  );
  return res.data;
};

export const updateOrderStatus = async (id, status) => {
  const res = await axios.put(
    "https://ecom-backend-service.onrender.com/orders/" + id,
    {
      status,
    }
  );
  return res.data;
};
