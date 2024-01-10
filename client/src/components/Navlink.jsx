import React from "react";
import { NavLink } from "react-router-dom";

function Navlink(props) {
  const { label, icon, path } = props;

  return (
    <NavLink to={path}>
      {icon && icon}
      {label && <label className="label">{label}</label>}
    </NavLink>
  );
}

export default Navlink;
