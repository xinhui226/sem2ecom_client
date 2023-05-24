import axios from "axios";

export const getAllCat = async () => {
  const res = await axios.get("http://localhost:7100/category");
  return res.data;
};

export const addNewCat = async (name) => {
  const res = await axios.post("http://localhost:7100/category", {
    name,
  });
  return res.data;
};

export const updCat = async (id, name) => {
  const res = await axios.put("http://localhost:7100/category/" + id, {
    name,
  });
  return res.data;
};

export const dltCat = async (id) => {
  const res = await axios.delete("http://localhost:7100/category/" + id);
  return res.data;
};
