import React, { useState, useEffect } from "react";
import ADashboardTab from "../../components/ADashboardTab";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../../components/Layout";
import { getAllPros, getProsByCat } from "../../api/productsApi";
import Productcard from "../../components/card/ProductCard";
import { Button } from "react-daisyui";
import useCategory from "../../hook/useCat";
import { Select } from "antd";
const { Option } = Select;
const AProducts = () => {
  const categories = useCategory();
  const [selectCategory, setSelectCategory] = useState("all");
  const [products, setProducts] = useState([]);

  // const getProducts = async () => {
  //   try {
  //     const res = await getAllPros();
  //     setProducts(res);
  //   } catch (error) {
  //     toast.error(error.response.data.msg);
  //   }
  // };

  // useEffect(() => {
  //   getProducts();
  // }, []);

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

  console.log(products);
  return (
    <Layout title={"Manage Products"}>
      <Toaster />
      <ADashboardTab />
      <div className="flex flex-col w-full component-preview p-4 items-center justify-center gap-2 font-sans">
        <div className="w-full flex justify-between">
          <Select
            bordered={false}
            placeholder="Select a category"
            size="large"
            className="mb-3"
            onChange={(e) => setSelectCategory(e)}
          >
            <Option value="all">All</Option>
            {categories.map((cat) => (
              <Option key={cat._id} value={cat._id}>
                {cat.name}
              </Option>
            ))}
          </Select>
          <a href="/dashboard/admin/addproduct">
            <Button className="bg-slate-400 border-none">Add Product</Button>
          </a>
        </div>

        <div className="grid items-stretch md:grid-cols-4 sm:grid-cols-3 grid-cols-2 gap-5">
          {products && products.length > 0 ? (
            products?.map((product) => {
              return <Productcard key={product._id} product={product} />;
            })
          ) : (
            <p className="text-center">No Product Found</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default AProducts;
