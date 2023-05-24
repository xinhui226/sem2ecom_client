import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import { Toaster, toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { getProduct, similarProduct } from "../api/productsApi";
import { Badge, Button } from "react-daisyui";
import CustomerProductcard from "../components/card/CustomerProductCard";
import { useCart } from "../context/cartcontext";
import { useAuth } from "../context/authContext";
import localforage from "localforage";
const ProductDetail = () => {
  const params = useParams();
  const redirect = useNavigate();
  const [auth] = useAuth();
  const [cart, setCart] = useCart();
  const [product, setProduct] = useState({});
  const [similarProducts, setSimilarProducts] = useState([]);
  useEffect(() => {
    if (params.slug) {
      const getProductData = async () => {
        const res = await getProduct(params.slug);
        setProduct(res);
        const getSimilarProduct = async () => {
          const res2 = await similarProduct(res?._id, res?.category?._id);
          setSimilarProducts(res2);
        };
        getSimilarProduct();
      };
      getProductData();
    }
  }, [params.slug]);
  //   console.log(product);
  // console.log("similar", similarProducts);

  const addToCart = () => {
    const myCart = [...cart];
    if (myCart.length > 0) {
      let findItem = myCart.findIndex((p) => p._id === product?._id);
      if (findItem !== -1) {
        if (myCart[findItem].cartqty >= myCart[findItem].qty) {
          toast.error("Product quantity is exceeded");
        } else {
          myCart[findItem] = {
            ...myCart[findItem],
            cartqty: (myCart[findItem].cartqty || 1) + 1,
          };
        }
      } else {
        myCart.push({ ...product, cartqty: 1 });
      }
      setCart(myCart);
      const savedCart = async () => {
        await localforage.setItem("cart", JSON.stringify(myCart));
      };
      savedCart();
      toast.success("Added to cart");
    } else {
      myCart.push({ ...product, cartqty: 1 });
      setCart(myCart);
      const savedCart = async () => {
        await localforage.setItem("cart", JSON.stringify(myCart));
      };
      savedCart();
      toast.success("Added to cart");
    }
  };

  return (
    <Layout>
      <Toaster />
      <div className="container p-4">
        <h1 className="text-xl font-medium">{product?.name}</h1>
        <div className="flex justify-center mt-5">
          <div className="grid sm:grid-cols-2 gap-8 sm:w-[70%]">
            <div className="border-2 rounded-xl flex justify-center sm:min-h-[40vh]">
              <img
                alt={product?.name}
                src={`https://ecom-backend-service.onrender.com/products/img/${product?._id}`}
                className="object-cover"
              />
            </div>
            <div className="border-2 rounded-xl flex flex-col p-3">
              <p className="text-lg font-medium">{product?.name} </p>
              <Badge size="sm">{product?.category?.name}</Badge>
              <p className="my-3 mt-5">Description :</p>
              <p className="text-sm">{product?.desc}</p>
              <p className="font-medium mt-5">RM {product?.price}</p>
              <p className="font-medium mt-5">In Stock :{product?.qty}</p>
              {auth?.user?.role === "customer" && (
                <Button
                  className="btn-sm w-fit block ms-auto mt-3 bg-slate-400 border-none"
                  onClick={() => addToCart()}
                >
                  Add to cart
                </Button>
              )}
              {!auth?.user && (
                <>
                  <p className="mt-3 text-center">
                    Kindly login to add item to cart
                  </p>
                  <Button
                    className="w-fit block mx-auto"
                    onClick={() =>
                      redirect("/login", { state: "/product/" + product?.slug })
                    }
                  >
                    Login
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
        <hr className="my-4" />
        <div className="">
          <p>Similar Products</p>
          {similarProducts && similarProducts?.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:w-[70%]">
              {similarProducts?.map((product) => (
                <CustomerProductcard
                  product={product}
                  key={product?._id}
                  cart={cart}
                  setCart={setCart}
                />
              ))}
            </div>
          ) : (
            <p className="text-center">No Similar Product Found</p>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
