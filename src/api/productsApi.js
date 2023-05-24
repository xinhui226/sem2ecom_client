import axios from "axios";

export const getAllPros = async () => {
  const res = await axios.get(
    "https://ecom-backend-service.onrender.com/products"
  );
  return res.data;
};

export const getProduct = async (slug) => {
  const res = await axios.get(
    "https://ecom-backend-service.onrender.com/products/" + slug
  );
  return res.data;
};

export const addNewProduct = async (product) => {
  const productForm = new FormData();
  productForm.append("name", product.name);
  productForm.append("desc", product.desc);
  productForm.append("price", product.price);
  product.img && productForm.append("img", product.img);
  productForm.append("category", product.category);
  productForm.append("qty", product.qty);
  productForm.append("shipping", product.shipping);
  const res = await axios.post(
    "https://ecom-backend-service.onrender.com/products",
    productForm
  );
  return res.data;
};

export const updProduct = async (product) => {
  const productForm = new FormData();
  productForm.append("name", product.name);
  productForm.append("desc", product.desc);
  productForm.append("price", product.price);
  product.img && productForm.append("img", product.img);
  productForm.append("category", product.category);
  productForm.append("qty", product.qty);
  productForm.append("shipping", product.shipping);
  console.log("img", product.img);
  const res = await axios.put(
    "https://ecom-backend-service.onrender.com/products/" + product._id,
    productForm
  );
  return res.data;
};

export const dltProduct = async (id) => {
  const res = await axios.delete(
    "https://ecom-backend-service.onrender.com/products/" + id
  );
  return res.data;
};

export const getTotalCount = async () => {
  const res = await axios.get(
    "https://ecom-backend-service.onrender.com/products/count"
  );
  return res.data;
};

export const getProductPerPage = async (page) => {
  const res = await axios.get(
    "https://ecom-backend-service.onrender.com/products/perpage/" + page
  );
  return res.data;
};

export const searchProduct = async (search) => {
  const res = await axios.get(
    "https://ecom-backend-service.onrender.com/products/search/" + search
  );
  return res.data;
};

export const similarProduct = async (pId, cId) => {
  const res = await axios.get(
    "https://ecom-backend-service.onrender.com/products/similar/" +
      pId +
      "/" +
      cId
  );
  return res.data;
};

export const getProsByCat = async (cId) => {
  const res = await axios.get(
    "https://ecom-backend-service.onrender.com/products/getbycat/" + cId
  );
  return res.data;
};
