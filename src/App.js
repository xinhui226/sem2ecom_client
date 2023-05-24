import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Aboutpage from "./pages/AboutPage";
import Contactpage from "./pages/ContactPage";
import PolicyPage from "./pages/PolicyPage";
import NotFoundPage from "./pages/PageNotFound";
import Register from "./pages/auth/Register";
import Login from "./pages/auth/Login";
import UserDashboard from "./pages/UserRoute/Profile";
import UserRoute from "./components/UserRoute";
import AdminRoute from "./components/AdminRoute";
import ADashboard from "./pages/AdminRoute/ADashboard";
import AddCategory from "./pages/AdminRoute/AAddCategory";
import AddProduct from "./pages/AdminRoute/AAddProduct";
import AOrder from "./pages/AdminRoute/AOrder";
import Profile from "./pages/UserRoute/Profile";
import Order from "./pages/UserRoute/Order";
import AProducts from "./pages/AdminRoute/AProducts";
import AProduct from "./pages/AdminRoute/AProduct";
import ProductDetail from "./pages/ProductDetail";
import Categories from "./pages/Categories";
import Cart from "./pages/Cart";
import CancelPage from "./pages/Cancel";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/about" element={<Aboutpage />} />
        <Route path="/contact" element={<Contactpage />} />
        <Route path="/policy" element={<PolicyPage />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cancel" element={<CancelPage />} />
        <Route path="/product/:slug" element={<ProductDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/dashboard" element={<UserRoute />}>
          <Route path="user" element={<UserDashboard />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/order" element={<Order />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<ADashboard />} />
          <Route path="admin/addcategory" element={<AddCategory />} />
          <Route path="admin/products" element={<AProducts />} />
          <Route path="admin/product/:slug" element={<AProduct />} />
          <Route path="admin/addproduct" element={<AddProduct />} />
          <Route path="admin/order" element={<AOrder />} />
        </Route>
        <Route path="/*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
