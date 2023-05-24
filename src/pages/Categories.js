import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Toaster } from "react-hot-toast";
import useCategory from "../hook/useCat";
import { Link } from "react-router-dom";
import { useCart } from "../context/cartcontext";
import CustomerCard from "../components/card/CustomerProductCard";
import { Select } from "antd";
import { getAllPros, getProsByCat } from "../api/productsApi";
const { Option } = Select;

const Categories = () => {
  const categories = useCategory();
  const [selectCategory, setSelectCategory] = useState("all");
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();
  useEffect(() => {
    if (selectCategory && selectCategory !== "all") {
      const getProducts = async () => {
        const res = await getProsByCat(selectCategory);
        setProducts(res);
      };
      getProducts();
    } else {
      const getProducts = async () => {
        const res = await getAllPros();
        setProducts(res?.products);
      };
      getProducts();
    }
  }, [selectCategory]);
  // console.log(products);
  return (
    <Layout title={"Categories"}>
      <Toaster />
      <div className="container p-4">
        <h1 className="text-lg font-medium">Categories</h1>
        <Select
          bordered={false}
          placeholder="Select a category"
          size="large"
          className="mb-3"
          onChange={(e) => setSelectCategory(e)}
        >
          <Option value="all">All</Option>
          {categories &&
            categories?.map((cat) => (
              <Option key={cat?._id} value={cat?._id}>
                {cat?.name}
              </Option>
            ))}
        </Select>
        {products && products?.length > 0 ? (
          <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1">
            {products?.map((product) => (
              <CustomerCard
                product={product}
                key={product?._id}
                cart={cart}
                setCart={setCart}
              />
            ))}
          </div>
        ) : (
          <p className="text-center">No Product Found</p>
        )}
      </div>
    </Layout>
  );
};

export default Categories;
