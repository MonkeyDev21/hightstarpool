import React from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import "../css/style.css"; // Import CSS của bạn
import Header from "../components/Header";
import Footer from "../components/Footer";
import Home from "../views/homes/Home";
import About from "../views/about/About";
import BackToTop from "../../common/components/BackToTop";
import Contact from "../views/contacts/Contact";
import Course from "../views/courses/Course";
import Product from "../views/products/Product";
import CourseDetail from "../views/courses/CourseDetail";
import { MyProfile } from "../../admin/views";
import PrivateRoute from "../../common/PrivateRoute";
import ShoppingCart from "../views/shopping-carts/ShoppingCart";
import { CartProvider } from "../../contexts/CartContext";
import BoxContact from "../components/BoxContact";
import MyClass from "../views/study/MyClass";

const SiteLayout = () => {
  return (
    <div className="container-fluid g-0 vh-100 bg-white">
      <CartProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to={"/"} />} />
          <Route path="/about" element={<About />} />
          <Route path="/course" element={<Course />} />
          <Route path="/product" element={<Product />} />
          <Route path="/course/:courseId" element={<CourseDetail />} />
          <Route path="/contact" element={<Contact />} />

          <Route
            path="/my-profile"
            element={
              <PrivateRoute roles={["ADMIN", "EMPLOYEE", "TRAINER", "USER"]}>
                <div className="bg-body-secondary pb-5 min-vh-100">
                  <div className="container-fluid bg-primary py-5 hero-header">
                    <div className="container py-1"></div>
                  </div>
                  <div className="p-5">
                    <MyProfile />
                  </div>
                </div>
              </PrivateRoute>
            }
          />

          <Route
            path="/my-class"
            element={
              <PrivateRoute roles={["ADMIN", "EMPLOYEE", "TRAINER", "USER"]}>
                <div className="bg-body-secondary">
                  <div className="container-fluid bg-primary py-5 hero-header">
                    <div className="container py-1"></div>
                  </div>
                  <div>
                    <MyClass />
                  </div>
                </div>
              </PrivateRoute>
            }
          />

          <Route
            path="/shopping-cart"
            element={
              <PrivateRoute roles={["ADMIN", "EMPLOYEE", "TRAINER", "USER"]}>
                <div className="bg-body-secondary pb-5 min-vh-100">
                  <div className="container-fluid bg-primary py-5 hero-header">
                    <div className="container py-1"></div>
                  </div>
                  <div className="mt-5">
                    <ShoppingCart />
                  </div>
                </div>
              </PrivateRoute>
            }
          />

          <Route path="*" element={<Navigate to={"/"} />} />
        </Routes>
        <Outlet />
        <Footer />
      </CartProvider>
      <BackToTop />
      <BoxContact />
    </div>
  );
};

export default SiteLayout;
