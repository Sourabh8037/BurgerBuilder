import React, { Component } from "react";
import axios from "../../../axios-orders";
import { connect } from "react-redux";
import Spinner from "../../../Components/UI/Spinner/Spinner";
import Input from "../../../Components/UI/Forms/Input/Input";
import * as actions from "../../../store/actions/index";
import { updateObject, checkValidity } from "../../../shared/utility";

class ContactData extends Component {
  //  STATE
  state = {
    orderForm: {
      name: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Name",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
        },
        touched: false,
      },
      street: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Street Name",
        },
        value: "",
        validation: {
          required: true,
          valid: false,
        },
        touched: false,
      },
      zipcode: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "5 digit ZIP Code",
        },
        touched: false,
        value: "",
        validation: {
          required: true,
          valid: false,
          minLength: 5,
          maxLength: 5,
        },
      },
      country: {
        elementType: "input",
        elementConfig: {
          type: "text",
          placeholder: "Your Country",
        },
        touched: false,
        value: "",
        validation: {
          required: true,
          valid: false,
        },
      },
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Your E-mail",
        },
        touched: false,
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
      },
      deliveryMethod: {
        elementType: "select",
        elementConfig: {
          options: [
            { value: "fastest", displayValue: "Fastest" },
            { value: "cheapest", displayValue: "Cheapest" },
          ],
        },
        value: "fastest",
        valid: true,
      },
    },
    formIsValid: false,
  };

  // METHODS
  orderHandler = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }
    const order = {
      ingredients: this.props.ings,
      price: this.props.totalPrice,
      orderData: formData,
      userId: this.props.userId,
    };
    this.props.onOrderBurger(order, this.props.token);
  };

  // ADDING TWO WAY BINDING
  inputChangeHandler = (event, inputIdentifier) => {
    const updatedFormElement = updateObject(
      this.state.orderForm[inputIdentifier],
      {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.orderForm[inputIdentifier].validation
        ),
        touched: true,
      }
    );
    const form = updateObject(this.state.orderForm, {
      [inputIdentifier]: updatedFormElement,
    });
    let formIsValid = true;
    for (let key in form) {
      formIsValid = form[key].valid && formIsValid;
    }
    form[inputIdentifier] = updatedFormElement;
    this.setState({ orderForm: form, formIsValid: formIsValid });
  };

  // RENDER METHOD
  render() {
    const formElementArray = [];
    for (let key in this.state.orderForm) {
      formElementArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }

    let form = (
      <form onSubmit={this.orderHandler}>
        {formElementArray.map((formElement) => (
          <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.value}
            touched={formElement.config.touched}
            valid={formElement.config.valid}
            changed={(event) => this.inputChangeHandler(event, formElement.id)}
          ></Input>
        ))}

        <div className="d-flex justify-content-center align-items-center">
          <button
            className="btn btn-lg btn-success"
            onClick={this.orderHandler}
            disabled={!this.state.formIsValid}
          >
            ORDER
          </button>
        </div>
      </form>
    );
    if (this.props.loading) {
      form = (
        <div className="d-flex flex-column align-items-center">
          <Spinner></Spinner>
          <h1 style={{ color: "#0ff" }}>Loading...</h1>
        </div>
      );
    }
    return (
      <div
        className="container my-5 py-3 text-light bg-dark border text-center"
        style={{ width: "70%" }}
      >
        <h2>Enter Your Contact Data</h2>
        {form}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    totalPrice: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token,
    userId: state.auth.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onOrderBurger: (orderData, token) =>
      dispatch(actions.purchaseBurger(orderData, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactData, axios);
