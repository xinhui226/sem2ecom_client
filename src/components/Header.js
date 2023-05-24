import React from "react";
import { Navbar, Button, Dropdown, Menu } from "react-daisyui";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { BsFillCartFill } from "react-icons/bs";
import { BiCaretDown } from "react-icons/bi";
import { MdOutlineLogout } from "react-icons/md";
import { useAuth } from "../context/authContext";
import localforage from "localforage";
// import SearchBox from "./form/SearchBox";
import useCategory from "../hook/useCat";
import { useCart } from "../context/cartcontext";
const Header = () => {
  const redirect = useNavigate();
  const [auth, setAuth] = useAuth();
  const categories = useCategory();
  const [cart, setCart] = useCart();
  const logout = async () => {
    await localforage.removeItem("user");
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    await localforage.removeItem("cart");
    setCart([]);
    redirect("/");
  };
  // console.log("auth", auth);

  return (
    <div className="flex w-full component-preview p-2 px-5 items-center justify-center gap-2 font-sans shadow-md">
      <Navbar>
        <Navbar.Start>
          <Link to="/" className="normal-case text-xl">
            Online Store
          </Link>
        </Navbar.Start>
        {/* <Navbar.Center className="hidden lg:flex">
          <Menu horizontal className="p-0">
            <Menu.Item>
              <NavLink
                className="bg-transparent text-slate-400 hover:bg-slate-400 hover:text-white"
                to="/"
              >
                Home
              </NavLink>
            </Menu.Item>
            <Menu.Item>
             
              {/* <Menu className="py-4 bg-base-100"> */}
        {/* {categories.map((cat) => (
                  <NavLink
                    key={cat._id}
                    className="bg-transparent text-slate-400 hover:bg-slate-400 hover:text-white px-3 py-2"
                    to={`/category/${cat.slug}`}
                  >
                    {cat.name}
                  </NavLink>
                ))} */}
        {/* </Menu> */}
        {/*} </Menu.Item>
          </Menu>
        </Navbar.Center> */}
        <Navbar.End>
          {/* {!auth.user ? (
            <>
              <Button className="hidden lg:flex mx-2 rounded-none bg-black">
                <NavLink to="/register">Register</NavLink>
              </Button>
              <Button className="hidden lg:flex rounded-none" variant="outline">
                <NavLink to="/login">Login</NavLink>
              </Button>
            </>
          ) : (
            <>
              {/* <div className="hidden sm:flex">
                <SearchBox />
              </div> */}
          {/* <p className="mx-2 hidden md:flex">Hi, {auth.user.name}</p>
              <Dropdown className="dropdown-end">
                <Button color="ghost" tabIndex={0} className="">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h8m-8 6h16"
                    />
                  </svg>
                </Button>
                <Dropdown.Menu className="w-52 menu-compact">
                  <Dropdown.Item href="/">Home</Dropdown.Item>
                  <Dropdown.Item href="/categories">Categories</Dropdown.Item>
                  <Dropdown.Item
                    href={`/dashboard/${
                      auth.user.role === "customer" ? "user" : "admin"
                    }`}
                  >
                    Dashboard
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logout}>
                    Sign out
                    <MdOutlineLogout className="ms-2" />
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </> 
          )} */}
          {auth?.user && <p>Hi, {auth?.user?.name}</p>}
          <Dropdown className="dropdown-end">
            <Button color="ghost" tabIndex={0} className="">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </Button>
            <Dropdown.Menu tabIndex={0} className="w-52 menu-compact mt-3">
              <Dropdown.Item className="overflow-auto">
                {/* <SearchBox /> */}
              </Dropdown.Item>
              <Dropdown.Item href="/">Home</Dropdown.Item>
              <Dropdown.Item href="/categories">Category</Dropdown.Item>
              {!auth?.user ? (
                <>
                  <Dropdown.Item href="/register" className="">
                    Register
                  </Dropdown.Item>
                  <Dropdown.Item href="/login" className="">
                    Login
                  </Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item
                    href={`/dashboard/${
                      auth?.user?.role === "customer" ? "user" : "admin"
                    }`}
                  >
                    Dashboard
                  </Dropdown.Item>
                  <Dropdown.Item onClick={logout}>
                    Sign out
                    <MdOutlineLogout className="ms-2" />
                  </Dropdown.Item>
                </>
              )}
            </Dropdown.Menu>
          </Dropdown>

          {auth?.user?.role === "customer" && (
            <NavLink to="/cart">
              <div className="indicator">
                <span className="indicator-item badge badge-dark">
                  {cart?.length
                    ? cart.reduce(function (prev, curr) {
                        return prev + curr.cartqty;
                      }, 0)
                    : 0}
                </span>
                <div className="grid place-items-center">
                  <BsFillCartFill size={25} className="mx-2" />
                </div>
              </div>
            </NavLink>
          )}
        </Navbar.End>
      </Navbar>
    </div>
  );
};

export default Header;
