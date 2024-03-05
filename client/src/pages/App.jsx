import React, { lazy, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { refreshToken } from "../app/services/authSlice.js";

const PublicRoute = lazy(() => import("./routes/PublicRoute.jsx"));
const PrivateRoute = lazy(() => import("./routes/PrivateRoute.jsx"));

const Auth = lazy(() => import("./public/auth/Auth.jsx"));
const Home = lazy(() => import("./public/home/Home.jsx"));
const About = lazy(() => import("./public/about/About.jsx"));
const Work = lazy(() => import("./public/work/Work.jsx"));
const Service = lazy(() => import("./public/service/Service.jsx"));
const Review = lazy(() => import("./public/review/Review.jsx"));
const Contact = lazy(() => import("./public/contact/Contact.jsx"));

const PageNotFound = lazy(() => import("./PageNotFound.jsx"));
const Admin = lazy(() => import("./private/Admin.jsx"));
const EditExperience = lazy(() => import("./private/EditExperience.jsx"));
const EditExpertise = lazy(() => import("./private/EditExpertise.jsx"));
const EditProject = lazy(() => import("./private/EditProject.jsx"));

function App() {
  const dispatch = useDispatch();
  const { mode } = useSelector((state) => state.ui);

  useEffect(() => {
    document.body.className = mode;
    dispatch(refreshToken());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicRoute />}>
          <Route index element={<Home />} />
          <Route path="auth" element={<Auth />} />
          <Route path="about" element={<About />} />
          <Route path="work" element={<Work />} />
          <Route path="service" element={<Service />} />
          <Route path="review" element={<Review />} />
          <Route path="contact" element={<Contact />} />
        </Route>
        <Route path="/admin" element={<PrivateRoute />}>
          <Route index element={<Admin />} />
          <Route path="editExperience" element={<EditExperience />} />
          <Route path="editExpertise" element={<EditExpertise />} />
          <Route path="editProject" element={<EditProject />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
