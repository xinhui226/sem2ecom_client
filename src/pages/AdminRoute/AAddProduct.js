import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import toast, { Toaster } from "react-hot-toast";
import ADashboardTab from "../../components/ADashboardTab";
import { useAuth } from "../../context/authContext";
import { getAllCat } from "../../api/categoryApi";
import { Select } from "antd";
import { Button, FileInput, Input, Textarea } from "react-daisyui";
import { addNewProduct } from "../../api/productsApi";
import { useNavigate } from "react-router-dom";
const { Option } = Select;

const AddProduct = () => {
  const [auth] = useAuth();
  const redirect = useNavigate();

  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState({
    name: "",
    desc: "",
    price: 0,
    qty: 0,
    category: "",
    shipping: "",
    img: "",
  });

  const getCategories = async () => {
    try {
      const res = await getAllCat();
      setCategories(res);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const onChangeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const addHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await addNewProduct(product);
      toast.success(res.msg, { duration: 3000 });
      redirect("/dashboard/admin/products");
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  return (
    <Layout title={"Add Product"}>
      <Toaster />
      <div className="flex flex-col w-full component-preview p-4 items-center justify-center gap-2 font-sans">
        <div className="w-[80%]">
          <a href="/dashboard/admin/products">
            <Button className="bg-slate-800 border-none">Back</Button>
          </a>
        </div>
        <div className="form-control w-full max-w-xs">
          <label className="label">
            <span className="label-text">Product Name</span>
          </label>
          <Input
            size="sm"
            name="name"
            placeholder="Enter product name"
            onChange={onChangeHandler}
            className="mb-3"
          />
          <label className="label">
            <span className="label-text">Description</span>
          </label>
          <Textarea
            size="sm"
            name="desc"
            placeholder="Enter product description"
            onChange={onChangeHandler}
            className="mb-3"
          />
          <label className="label">
            <span className="label-text">Price</span>
          </label>
          <Input
            size="sm"
            name="price"
            type="number"
            placeholder="Enter product price"
            onChange={onChangeHandler}
            className="mb-3"
          />
          <label className="label">
            <span className="label-text">Quantity</span>
          </label>
          <Input
            size="sm"
            name="qty"
            type="number"
            placeholder="Enter product quantity"
            onChange={onChangeHandler}
            className="mb-3"
          />
          <label className="label">
            <span className="label-text">Shipping</span>
          </label>
          <Select
            bordered={false}
            placeholder="Select shipping"
            size="small"
            showSearch
            className="mb-3"
            onChange={(e) => setProduct({ ...product, shipping: e })}
          >
            <Option value="true">Yes</Option>
            <Option value="false">No</Option>
          </Select>
          <label className="label">
            <span className="label-text">Category</span>
          </label>
          <Select
            bordered={false}
            placeholder="Select a category"
            size="small"
            showSearch
            className="mb-3"
            onChange={(e) => setProduct({ ...product, category: e })}
          >
            {categories.map((cat) => (
              <Option key={cat._id} value={cat._id}>
                {cat.name}
              </Option>
            ))}
          </Select>

          {product.img && (
            <div className="my-3">
              <img
                src={URL.createObjectURL(product.img)}
                alt="product"
                className="max-h-[150px] max-w-[150px]"
              />
            </div>
          )}
          <FileInput
            size="sm"
            name="img"
            accept="image/*"
            onChange={(e) =>
              setProduct({ ...product, [e.target.name]: e.target.files[0] })
            }
            className="mb-3"
          />
        </div>
        <Button className="bg-slate-400 border-none" onClick={addHandler}>
          Add Product
        </Button>
      </div>
    </Layout>
  );
};

export default AddProduct;
