import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../context/authContext";
import { getAllPros } from "../api/productsApi";
import CustomerProductcard from "../components/card/CustomerProductCard";
import { useCart } from "../context/cartcontext";
const Homepage = () => {
  const [auth, setAuth] = useAuth();
  // console.log("auth", auth);
  // const [page, setPage] = useState(1);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useCart();
  console.log("cart", cart);
  useEffect(() => {
    const getProductsData = async () => {
      try {
        const res = await getAllPros();
        setProducts(res);
      } catch (error) {
        toast.error(error);
      }
    };
    getProductsData();
  }, []);
  // console.log(products);
  return (
    <Layout title={"Online Store"}>
      <Toaster />
      <div className="container p-4">
        <header className="flex justify-between mt-12 px-7 lg:px-44 flex-col md:flex-row gap-y-7 mb-8">
          <div className="flex flex-col gap-y-2 w-full sm:w-3/4 justify-center">
            <p className="font-bold sm:text-4xl text-3xl tracking-wide">
              Lorem ipsum dolor sit amet consectetur elit.
            </p>
            <p className="font-light text-sm">
              lorem ipsum dolor sit amet consectetur adipisicing elit non
              quibusdam lorem ipsum dolor sit amet consectetur adipisicing elit
              non quibusdam lorem ipsum dolor
            </p>
          </div>
          <img
            src="https://images.pexels.com/photos/2528116/pexels-photo-2528116.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="header"
            width={320}
            height={270}
            className="rounded-3xl block mx-auto"
          />
        </header>
        <h1 className="text-lg font-medium my-7">All Products</h1>
        <div className="grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 py-7">
          {products?.products?.length > 0 &&
            products?.products?.map((product) => (
              <CustomerProductcard
                product={product}
                key={product?._id}
                cart={cart}
                setCart={setCart}
              />
            ))}
        </div>
      </div>
    </Layout>
  );
};

export default Homepage;
