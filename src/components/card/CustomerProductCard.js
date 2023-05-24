import localforage from "localforage";
import React from "react";
import { Button, Card } from "react-daisyui";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext";

const CustomerProductcard = ({ product, setCart, cart }) => {
  const [auth] = useAuth();
  const redirect = useNavigate();
  const myCart = [...cart];
  const addToCart = () => {
    if (myCart.length > 0) {
      let findItem = myCart.findIndex((p) => p._id === product._id);
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
    <Card className="border-none max-w-[220px] max-h-[280px]">
      <Card.Image
        src={`https://ecom-backend-service.onrender.com/products/img/${product._id}`}
        alt={product.name}
        className="object-cover"
      />
      <Card.Body className="p-1">
        <Card.Title className="font-medium flex justify-center text-base">
          {product.name}
        </Card.Title>
        <p className="font-semibold text-center text-sm">
          FROM RM {product.price}
        </p>
        <p className="text-sm">{product.desc.substring(0, 30)}...</p>
      </Card.Body>
      <div className="flex justify-end p-2 border-t gap-2">
        {auth?.user?.role === "customer" && (
          <Button
            className="btn-xs bg-slate-400 border-none"
            onClick={() => {
              addToCart();
            }}
          >
            Add to cart
          </Button>
        )}
        <Button
          className="btn-xs bg-slate-600 border-none"
          onClick={() => redirect(`/product/${product.slug}`)}
        >
          More Details
        </Button>
      </div>
    </Card>
    // <></>
  );
};

export default CustomerProductcard;
