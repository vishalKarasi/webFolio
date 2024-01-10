import React from "react";
import { Outlet } from "react-router-dom";
import LazyLoad from "./LazyLoad.js";
const Header = LazyLoad("../../pages/public/header/Header.jsx");
const Footer = LazyLoad("../../pages/public/footer/Footer.jsx");

const PublicRoute = () => {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
};

export default PublicRoute;
