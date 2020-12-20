import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../Components/Order/Checkout/CheckoutSummary";
import ContactData from "./Contact/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
  // METHODS

  checkoutSummaryCancelled = () => {
    this.props.history.goBack();
  };
  checkoutSummaryContinued = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  // VARIABLES ON DEPENDENCIES

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <React.Fragment>
          {purchasedRedirect}
          <CheckoutSummary
            ingredients={this.props.ings}
            checkoutSummaryCancelled={this.checkoutSummaryCancelled}
            checkoutSummaryContinued={this.checkoutSummaryContinued}
          ></CheckoutSummary>
          <Route
            path={this.props.match.url + "/contact-data"}
            component={ContactData}
          />
        </React.Fragment>
      );

      return summary;
    }
  }
}
const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    purchased: state.order.purchased,
  };
};

export default connect(mapStateToProps)(Checkout);
