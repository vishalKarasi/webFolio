import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import LazyLoad from "./utils/LazyLoad.js";
import { refreshToken } from "./services/authSlice.js";
import PublicRoute from "./utils/PublicRoute.jsx";
import PrivateRoute from "./utils/PrivateRoute.jsx";

const Auth = LazyLoad("../../pages/public/auth/Auth.jsx");
const Home = LazyLoad("../../pages/public/home/Home.jsx");
const About = LazyLoad("../../pages/public/about/About.jsx");
const Work = LazyLoad("../../pages/public/work/Work.jsx");
const Service = LazyLoad("../../pages/public/service/Service.jsx");
const Review = LazyLoad("../../pages/public/review/Review.jsx");
const Contact = LazyLoad("../../pages/public/contact/Contact.jsx");
const PageNotFound = LazyLoad("../../pages/PageNotFound.jsx");

const Admin = LazyLoad("../../pages/private/Admin.jsx");
const EditExperience = LazyLoad("../../pages/private/EditExperience.jsx");
const EditExpertise = LazyLoad("../../pages/private/EditExpertise.jsx");
const EditProject = LazyLoad("../../pages/private/EditProject.jsx");

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
          <Route exact index element={<Admin />} />
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
