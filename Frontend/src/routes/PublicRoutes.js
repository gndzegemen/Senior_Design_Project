import { Route } from "react-router-dom";
import HomePage from "../pages/Home/Homepage";
import Signin from "../pages/Auth/Signin";
import Signup from "../pages/Auth/Signup";
import ForgotPassword from "../pages/Auth/ForgotPassword";
import { HomeLayout } from "../layouts/HomeLayout.js";
import Products from "../pages/Store/Products/Products";
import Product from "../pages/Store/Product/Product";
import Display from "../pages/Display/Display";

export const PublicRoutes = () => {
  return [
    <Route
      key="home"
      path="/"
      element={
        <HomeLayout>
          <HomePage />
        </HomeLayout>
      }
    />,
    <Route key="signin" path="/login" element={<Signin />} />,
    <Route key="signup" path="/register" element={<Signup />} />,
    <Route
      key="forgot-password"
      path="/forgot-password"
      element={<ForgotPassword />}
    />,
    <Route
      key="products"
      path="/products"
      element={
        <HomeLayout>
          <Products />
        </HomeLayout>
      }
    />,
    <Route
      key="product"
      path="/product/:id"
      element={
        <HomeLayout>
          <Product />
        </HomeLayout>
      }
    />,
    <Route
      key="display"
      path="/display"
      element={<Display />} />,
  ];
};
