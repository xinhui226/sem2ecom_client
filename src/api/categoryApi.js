import axios from "axios";

export const getAllCat = async () => {
  const res = await axios.get(
    "https://ecom-backend-service.onrender.com/category"
  );
  return res.data;
};

export const addNewCat = async (name) => {
  const res = await axios.post(
    "https://ecom-backend-service.onrender.com/category",
    {
      name,
    }
  );
  return res.data;
};

export const updCat = async (id, name) => {
  const res = await axios.put(
    "https://ecom-backend-service.onrender.com/category/" + id,
    {
      name,
    }
  );
  return res.data;
};

export const dltCat = async (id) => {
  const res = await axios.delete(
    "https://ecom-backend-service.onrender.com/category/" + id
  );
  return res.data;
};
