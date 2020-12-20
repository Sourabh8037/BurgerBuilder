import React from "react";
import Logo from "../../Logo/Logo";
import NavLink from "../NavigationLink/NavigationLink";

const toolbar = (props) => (
  <header>
    <nav className="navbar navbar-expand-md navbar-dark bg-danger fixed-top">
      <div className="container px-4">
        <NavLink className="navbar-brand d-flex" to="/">
          <Logo></Logo>
          <span className="h1 ml-2">Menu</span>
        </NavLink>
        <button
          className="navbar-toggler"
          data-toggle="collapse"
          data-target="#navbarNav"
          onClick={props.sideD}
        >
          <span className="navbar-toggler-icon text-white"></span>
        </button>
        <div className="collapse navbar-collapse ml-auto" id="#navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item ml-3">
              <NavLink className="nav-link bg-danger lead" exact={true} to="/">
                Home
              </NavLink>
            </li>
            {props.isAuth ? (
              <li className="nav-item ml-3">
                <NavLink
                  className="nav-link bg-danger lead"
                  exact={true}
                  to="/orders"
                >
                  Orders
                </NavLink>
              </li>
            ) : null}
            <li className="nav-item ml-3">
              {props.isAuth ? (
                <NavLink
                  className="nav-link bg-danger lead"
                  exact={true}
                  to="/logout"
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink
                  className="nav-link bg-danger lead"
                  exact={true}
                  to="/auth"
                >
                  Authenticate
                </NavLink>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
);
export default toolbar;
