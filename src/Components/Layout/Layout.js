import React, { Component } from "react";
import Aux from "../../HOC/Auxillary";
import "./Layout.css";
import Toolbar from "../../Components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../SideDrawer/SideDrawer";
import { connect } from "react-redux";

class Layout extends Component {
  state = {
    sideDrawer: false,
  };
  sideDrawerToggler = () => {
    this.setState({ sideDrawer: !this.state.sideDrawer });
  };
  render() {
    return (
      <Aux>
        <Toolbar
          sideD={this.sideDrawerToggler}
          isAuth={this.props.isAuth}
        ></Toolbar>
        <SideDrawer
          show={this.state.sideDrawer}
          sideD={this.sideDrawerToggler}
          isAuth={this.props.isAuth}
        ></SideDrawer>
        <main className="content">{this.props.children}</main>
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuth: state.auth.token !== null,
  };
};

export default connect(mapStateToProps)(Layout);
