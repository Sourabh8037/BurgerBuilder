import React from "react";
import "./SideDrawer.css";
import Backdrop from "../UI/Backdrop/Backdrop";
import NavLink from "../Navigation/NavigationLink/NavigationLink";
import Aux from "../../HOC/Auxillary";

const sideDrawer = (props) => {
  let classes = "Close";
  if (props.show) {
    classes = props.isAuth ? "OpenAuth" : "OpenUnAuth";
  }
  const sideD = (
    <Aux>
      <Backdrop show={props.show} clicked={props.sideD}></Backdrop>
      <ul
        className={"navbar-nav ml-auto d-sm-block d-md-none " + classes}
        onClick={props.sideD}
      >
        <li className="">
          <NavLink
            className="lead btn btn-danger btn-block"
            exact={true}
            to="/"
          >
            <h4>Home</h4>
          </NavLink>
        </li>
        {props.isAuth ? (
          <li className="">
            <NavLink
              className="lead btn btn-danger btn-block"
              exact={true}
              to="/orders"
            >
              <h4>Orders</h4>
            </NavLink>
          </li>
        ) : null}
        <li className="">
          {props.isAuth ? (
            <NavLink
              className="lead btn btn-danger btn-block"
              exact={true}
              to="/logout"
            >
              <h4>Logout</h4>
            </NavLink>
          ) : (
            <NavLink
              className="lead btn btn-danger btn-block"
              exact={true}
              to="/auth"
            >
              <h4>Authenticate</h4>
            </NavLink>
          )}
        </li>
      </ul>
    </Aux>
  );

  return sideD;
};

export default sideDrawer;
