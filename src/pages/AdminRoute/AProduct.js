import React, { useState, useEffect } from "react";
import Layout from "../../components/Layout";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../context/authContext";
import { getAllCat } from "../../api/categoryApi";
import { Select } from "antd";
import { Button, FileInput, Input, Textarea } from "react-daisyui";
import {
  addNewProduct,
  dltProduct,
  getProduct,
  updProduct,
} from "../../api/productsApi";
import { useNavigate, useParams } from "react-router-dom";
import DltModal from "../../components/modal/DltModal";
const { Option } = Select;
const AProduct = () => {
  const [auth] = useAuth();
  const redirect = useNavigate();
  const params = useParams();

  const [visible, setVisible] = useState(false);
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
  const [newImg, setNewImg] = useState("");

  const getCategories = async () => {
    try {
      const res = await getAllCat();
      setCategories(res);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };
  const getProductDetail = async () => {
    try {
      const res = await getProduct(params.slug);
      //   console.log(res);
      setProduct({ ...res, category: res?.category?._id });
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };

  const onChangeHandler = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    getCategories();
    getProductDetail();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // console.log(product);

  const updHandler = async (e) => {
    e.preventDefault();
    try {
      //   console.log("img2", product.img);
      const res = await updProduct(product);
      toast.success(res.msg, {
        duration: 3000,
      });
      redirect("/dashboard/admin/product/" + res.product.slug);
    } catch (error) {
      toast.error(error.response.data.msg);
    }
  };

  const dltHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await dltProduct(product._id);
      toast.success(res.msg, {
        duration: 3000,
      });
      redirect("/dashboard/admin/products");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.msg);
    }
  };
  console.log(product);

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
            value={product?.name}
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
            value={product.desc}
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
            value={product.price}
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
            value={product.qty}
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
            value={product.shipping}
            onChange={(e) => setProduct({ ...product, shipping: e })}
          >
            <Option value={true}>Yes</Option>
            <Option value={false}>No</Option>
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
            value={product?.category}
            onChange={(e) => setProduct({ ...product, category: e })}
          >
            {categories.map((cat) => (
              <Option key={cat._id} value={cat._id}>
                {cat.name}
              </Option>
            ))}
          </Select>

          <div className="my-3">
            {newImg ? (
              <img
                src={URL.createObjectURL(newImg)}
                alt="product"
                className="max-h-[250px] max-w-[250px]"
              />
            ) : (
              <img
                src={`http://localhost:7100/products/img/${product._id}`}
                alt={product.name}
                className="max-h-[250px] max-w-[250px]"
              />
            )}
          </div>
          <FileInput
            size="sm"
            name="img"
            accept="image/*"
            onChange={(e) => {
              setNewImg(e.target.files[0]);
              setProduct({ ...product, [e.target.name]: e.target.files[0] });
            }}
            className="mb-3"
          />
        </div>
        <div className="flex justify-end gap-2 mt-3">
          <Button className="bg-slate-400 border-none" onClick={updHandler}>
            Edit
          </Button>
          <Button
            className="bg-slate-600 border-none"
            onClick={() => setVisible(!visible)}
          >
            Delete
          </Button>
        </div>
      </div>
      <DltModal
        handleDlt={dltHandler}
        title={`Product ${product.name}`}
        name={product.name}
        visible={visible}
        setVisible={setVisible}
      />
    </Layout>
  );
};

export default AProduct;
