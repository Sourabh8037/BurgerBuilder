import React, { Component } from "react";
import Aux from "../../../HOC/Auxillary";

class OrderSummary extends Component {
  render() {
    let ingredientsSummary = Object.keys(this.props.ingredients).map(
      (igKey) => {
        return (
          <li key={igKey}>
            <span style={{ textTransform: "uppercase" }}>{igKey}</span>:{" "}
            {this.props.ingredients[igKey]}
          </li>
        );
      }
    );

    return (
      <Aux>
        <h3>Your Order</h3>
        <p>A delicious Burger with following ingredients:</p>
        <ul>{ingredientsSummary}</ul>
        <p style={{ margin: "7rem 0 0 0" }}>
          Total Price: {this.props.totalPrice.toFixed(2)}
        </p>
        <p>Continue to CheckOut?</p>
        <div className="d-flex align-items-center justify-content-around">
          <button
            className="btn btn-danger mx-1"
            onClick={this.props.purchaseCanceled}
          >
            CANCEL
          </button>
          <button
            className="btn btn-success mx-1"
            onClick={this.props.purchaseContinue}
          >
            CONTINUE
          </button>
        </div>
      </Aux>
    );
  }
}

export default OrderSummary;
