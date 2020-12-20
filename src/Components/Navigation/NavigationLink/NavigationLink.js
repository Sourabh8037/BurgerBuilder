import React from "react";
import { NavLink } from "react-router-dom";
const navLink = (props) => (
  <div>
    <NavLink
      className={props.className}
      activeClassName="active"
      to={props.to}
      exact={props.exact}
    >
      {props.children}
    </NavLink>
  </div>
);
export default navLink;
