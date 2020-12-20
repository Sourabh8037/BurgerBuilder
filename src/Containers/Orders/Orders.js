import React, { Component } from "react";
import { connect } from "react-redux";
import "./Orders.css";

import Order from "../../Components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../HOC/WithErrorHandler/WithErrorHandler";
import * as actions from "../../store/actions/index";
import Spinner from "../../Components/UI/Spinner/Spinner";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }

  render() {
    let orders = <Spinner />;
    if (!this.props.loading && this.props.orders.length>0) {
      orders = this.props.orders.map((order) => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      ));
      if(this.props.orders.length == 0){
        console.log("No orders!!!");
        orders = <div class="alert alert-danger m-4" role="alert">
        There are currently no order in your name!<br></br>
        Please order our burger to see your orders over here
        </div>
      }
    }
    return <div className="mt-8">{orders}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token, userId) =>
      dispatch(actions.fetchOrders(token, userId)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(Orders, axios));
