import React from "react";
import "./header.scss";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Navlink from "@components/Navlink.jsx";
import { setTheme, toggleMode, toggle } from "@app/services/uiSlice.js";
import {
  Cancel,
  Education,
  Home,
  Login,
  Logout,
  Menu,
} from "@assets/icons/ButtonIcons";
import {
  About,
  Admin,
  Contact,
  Moon,
  Review,
  Service,
  Sun,
  Theme,
  Work,
} from "@assets/icons/NavIcons";
import { logout } from "@app/services/authSlice";

function Header({ type }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { accessToken, status } = useSelector((state) => state.auth);
  const { theme, mode, menu } = useSelector((state) => state.ui);

  const NavData =
    type === "Admin"
      ? [
          {
            label: "Home",
            path: "/admin",
            icon: <Home />,
          },
          {
            label: "Experience",
            path: "/admin/editExperience",
            icon: <Education />,
          },
          {
            label: "Expertise",
            path: "/admin/editExpertise",
            icon: <Service />,
          },
          { label: "Project", path: "/admin/editProject", icon: <Work /> },
        ]
      : [
          { label: "About", path: "/about", icon: <About /> },
          { label: "Work", path: "/work", icon: <Work /> },
          { label: "Service", path: "/service", icon: <Service /> },
          { label: "Review", path: "/review", icon: <Review /> },
          { label: "Contact", path: "/contact", icon: <Contact /> },
        ];

  return (
    <header id="header">
      <Link to="/" className="logo">
        <span>&lt;</span>
        <b>web</b>
        <span>Folio&gt;</span>
      </Link>

      <nav className={menu ? "active" : ""}>
        {NavData.map((link) => (
          <Navlink key={link.label} {...link} />
        ))}
      </nav>

      <ul className="setting">
        <li className="theme">
          <input
            type="color"
            value={theme}
            id="theme"
            onChange={(event) => dispatch(setTheme(event.target.value))}
          />
          <Theme />
          <label className="label" htmlFor="theme">
            Theme
          </label>
        </li>

        <li className="mode" onClick={() => dispatch(toggleMode())}>
          {mode === "light" ? <Moon /> : <Sun />}
        </li>

        {type === "Admin" ? (
          <Link
            className="login"
            onClick={() =>
              dispatch(logout()).then(() => {
                if (status === "success") navigate("/");
              })
            }
          >
            <div className="label">Logout</div>
            <Logout />
          </Link>
        ) : (
          <Link className="login" to={accessToken ? "/admin" : "/auth"}>
            <div className="label">{accessToken ? "Admin" : "Login"}</div>
            {accessToken ? <Admin /> : <Login />}
          </Link>
        )}

        <li className="menu" onClick={() => dispatch(toggle("menu"))}>
          {menu ? <Cancel /> : <Menu />}
        </li>
      </ul>
    </header>
  );
}

export default Header;
