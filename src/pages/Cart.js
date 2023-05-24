import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import toast, { Toaster } from "react-hot-toast";
import { useCart } from "../context/cartcontext";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import { Button, Card, Form, Input } from "react-daisyui";
import { MdDelete } from "react-icons/md";
import localforage from "localforage";
import axios from "axios";
import { invalidEmail } from "../utils/userValidation";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [auth, setAuth] = useAuth();
  const redirect = useNavigate();

  const [info, setInfo] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
  });

  useEffect(() => {
    if (auth?.user) {
      const { email, phone } = auth?.user;
      setInfo({ ...info, email, phone });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth?.user]);

  const removeCartItem = (idx) => {
    let myCart = [...cart];
    myCart.splice(idx, 1);
    setCart(myCart);
    const savedCart = async () => {
      await localforage.setItem("cart", JSON.stringify(myCart));
    };
    savedCart();
    toast.success("Item removed");
  };

  const increase = (idx) => {
    let myCart = [...cart];
    myCart[idx].cartqty++;
    setCart(myCart);
    const savedCart = async () => {
      await localforage.setItem("cart", JSON.stringify(myCart));
    };
    savedCart();
  };
  const decrease = (idx) => {
    let myCart = [...cart];
    myCart[idx].cartqty--;
    if (myCart[idx].cartqty < 1) {
      myCart.splice(idx, 1);
    }
    setCart(myCart);
    const savedCart = async () => {
      await localforage.setItem("cart", JSON.stringify(myCart));
    };
    savedCart();
  };

  const total = () => {
    let totalPrice = 0;
    cart?.map((item) => {
      totalPrice += item.cartqty * item.price;
    });
    return totalPrice;
  };

  const onChangeHandler = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const submitOrder = async (e) => {
    e.preventDefault();

    const { name, email, address, phone } = info;
    if (!name || !email || !address || !phone)
      return toast.error("All fields are required");

    const emailInvalid = invalidEmail(email);
    if (emailInvalid) return toast.error(invalidEmail);

    const totalPrice = total();
    const myCart = [];
    cart.map((item) =>
      myCart.push({
        product: item._id,
        price: item.price,
        pro_name: item.name,
        cartqty: item.cartqty,
        subtotal: item.price * item.cartqty,
      })
    );
    const res = await axios.post("http://localhost:7100/orders", {
      details: info,
      total: totalPrice,
      cart: myCart,
    });

    if (res.status === 200) {
      const emptyCart = async () => {
        setCart([]);
        await localforage.removeItem("cart");
      };
      emptyCart();
      window.location.href = res.data;
    }
  };

  return (
    <Layout title={"Online Store"}>
      <Toaster />
      <div className="container p-4">
        <h1 className="text-lg font-medium">Carts</h1>
        <div className="w-full min-h-[50vh] sm:flex gap-8 justify-center items-center">
          {cart && cart?.length > 0 ? (
            <>
              <div className="overflow-y-scroll hide-scrollbar max-h-[50vh]">
                {cart &&
                  cart?.map((c, idx) => (
                    <Card side="sm">
                      <Card.Image
                        src={`http://localhost:7100/products/img/${c._id}`}
                        alt={c.name}
                        className="object-cover"
                        width="max-w-[200px]"
                        height="max-h-[100px]"
                      />
                      <Card.Body className="pt-2">
                        <div className="flex justify-end">
                          <MdDelete
                            size={20}
                            className="text-rose-500"
                            onClick={() => removeCartItem(idx)}
                          />
                        </div>
                        <Card.Title tag="h2">{c.name}</Card.Title>
                        <p>{c.desc.substring(0, 30)}...</p>
                        <p>price : RM {c.price}</p>
                        <div className="flex gap-2 justify-end">
                          <Button
                            className="btn-xs"
                            onClick={() => decrease(idx)}
                          >
                            -
                          </Button>
                          {c.cartqty}
                          <Button
                            className="btn-xs"
                            disabled={c.cartqty >= c.qty}
                            onClick={() => increase(idx)}
                          >
                            +
                          </Button>
                        </div>
                        <p className="text-end">
                          total : RM{c.price * c.cartqty}
                        </p>
                      </Card.Body>
                    </Card>
                  ))}
              </div>
              <div>
                {auth?.user && (
                  <div className="mb-3">
                    <Form.Label title="Name" />
                    <Input
                      onChange={onChangeHandler}
                      name="name"
                      placeholder="Name"
                      className="input-bordered"
                      value={info.name}
                      required
                    />
                    <Form.Label title="Phone" />
                    <Input
                      onChange={onChangeHandler}
                      name="phone"
                      placeholder="Phone"
                      className="input-bordered"
                      value={info.phone}
                      required
                    />
                    <Form.Label title="Email" />
                    <Input
                      onChange={onChangeHandler}
                      name="email"
                      placeholder="Email"
                      className="input-bordered"
                      value={info.email}
                      required
                    />
                    <Form.Label title="Address" />
                    <Input
                      onChange={onChangeHandler}
                      name="address"
                      placeholder="Address"
                      className="input-bordered"
                      value={info.address}
                      required
                    />
                  </div>
                )}
                <h1 className="text-xl font-semibold">Checkout</h1>
                <p>Total : RM {total()}</p>
                <div className="flex flex-col items-end w-full mt-5">
                  {!auth?.token ? (
                    <>
                      <label className="text-sm">Kindly Login to Proceed</label>
                      <Button
                        className="bg-slate-400 border-none"
                        onClick={() => {
                          redirect("/login", {
                            state: "/cart",
                          });
                        }}
                      >
                        Login
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button
                        className="w-fit border-none mt-3 bg-slate-400 block"
                        onClick={submitOrder}
                      >
                        Checkout
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </>
          ) : (
            <div className="block">
              <p className="font-medium text-lg mb-4">Your cart is empty</p>
              <Button
                className="bg-slate-400 border-none"
                onClick={() => redirect("/")}
              >
                Go shopping
              </Button>
            </div>
          )}
        </div>
        {/* {JSON.stringify(cart)} */}
      </div>
    </Layout>
  );
};

export default Cart;
