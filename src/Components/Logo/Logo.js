import React from "react";
import burgerLogo from "../../Assets/img/original.png";
import "./Logo.css";
const logo = (props) => (
  <div className="Logo">
    <img src={burgerLogo} alt="MY BURGER" height="40px" width="50px"></img>
  </div>
);

export default logo;
