import React, { Component } from "react";
import Aux from "../../HOC/Auxillary";
import Burger from "../../Components/Burger/Burger";
import BuildControls from "../../Components/Burger/BuildControls/BuildControls";
import Modal from "../../Components/UI/Modal/Modal";
import OrderSummary from "../../Components/Burger/Ordersummary/OrderSummary";
import Spinner from "../../Components/UI/Spinner/Spinner";
import withErrorHandler from "../../HOC/WithErrorHandler/WithErrorHandler";
import { connect } from "react-redux";
import axios from "../../axios-orders";
import * as burgerBuilderActions from "../../store/actions/index";

export class BurgerBuilder extends Component {
  // STATE
  state = {
    purchasing: false,
    sideDrawer: false,
  };

  componentDidMount() {
    if (!this.props.ings) this.props.onInitIngredients();
  }

  // METHODS
  sideDrawerToggleHandler = () => {
    this.setState({ sideDrawer: !this.state.sideDrawer });
  };

  purchaseContinueHandler = () => {
    this.props.history.push("/checkout");
  };

  purchaseHandler = () => {
    if (this.props.isAuth) {
      this.setState({ purchasing: true });
    } else {
      this.props.onSetAuthRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  purchaseCancelHandler = () => {
    this.setState({ purchasing: false });
  };

  updatePurchaseState = (ingredients) => {
    const sum = Object.keys(ingredients)
      .map((ing) => {
        return ingredients[ing];
      })
      .reduce((sum, el) => {
        return sum + el;
      }, 0);
    return sum > 0;
  };

  render() {
    const disabledInfo = { ...this.props.ings };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    //  LOADING STATE FROM FIREBASE
    let orderSummary = null;
    let burger = this.props.error ? (
      <p>Ingredients can't be loaded.</p>
    ) : (
      <div style={{ margin: "8rem 0 0 0" }}>
        <Spinner></Spinner>
      </div>
    );
    if (this.props.ings) {
      burger = (
        <Aux>
          <div style={{ margin: "8rem 0 2rem 0" }}>
            <Burger ingredients={this.props.ings} border />
          </div>
          <BuildControls
            ingredientAdded={this.props.onIngredientsAdded}
            ingredientRemoved={this.props.onIngredientsRemoved}
            disabledInfo={disabledInfo}
            price={this.props.totalPrice}
            isAuth={this.props.isAuth}
            purchasable={this.updatePurchaseState(this.props.ings)}
            order={this.purchaseHandler}
          />
        </Aux>
      );
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          purchaseCanceled={this.purchaseCancelHandler}
          purchaseContinue={this.purchaseContinueHandler}
          totalPrice={this.props.totalPrice}
        />
      );
    }

    return (
      <Aux>
        <Modal
          show={this.state.purchasing}
          modalClose={this.purchaseCancelHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </Aux>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuth: state.auth.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onIngredientsAdded: (ingName) =>
      dispatch(burgerBuilderActions.addIngredient(ingName)),
    onIngredientsRemoved: (ingName) =>
      dispatch(burgerBuilderActions.removeIngredient(ingName)),
    onInitIngredients: () => dispatch(burgerBuilderActions.initIngredients()),
    onSetAuthRedirectPath: (path) =>
      dispatch(burgerBuilderActions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
