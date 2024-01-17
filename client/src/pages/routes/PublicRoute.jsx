import React, { lazy } from "react";
import { Outlet } from "react-router-dom";
const Header = lazy(() => import("@pages/public/header/Header.jsx"));
const Footer = lazy(() => import("@pages/public/footer/Footer.jsx"));

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
