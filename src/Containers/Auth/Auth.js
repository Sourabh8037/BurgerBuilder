import React, { Component } from "react";
import Input from "../../Components/UI/Forms/Input/Input";
import { Redirect } from "react-router-dom";
import "../../Assets/styles.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../Components/UI/Spinner/Spinner";
import { updateObject, checkValidity } from "../../shared/utility";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          type: "email",
          placeholder: "Email Address",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          type: "password",
          placeholder: "Password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: false,
  };

  //METHODS

  componentDidMount() {
    if (!this.props.building && this.props.authRedirectPath !== "/") {
      this.props.onSetRedirectPath();
    }
  }

  switchAuthModeHandler = () => {
    this.setState((prevState) => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  inputChangeHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true,
      }),
    });
    this.setState({ controls: updatedControls });
  };

  //CHECKING VALIDITY
  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  render() {
    const formElementArray = [];
    for (let key in this.state.controls) {
      formElementArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }

    let form = formElementArray.map((formElement) => (
      <Input
        key={formElement.id}
        elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.value}
        touched={formElement.config.touched}
        valid={formElement.config.valid}
        changed={(event) => this.inputChangeHandler(event, formElement.id)}
      ></Input>
    ));

    if (this.props.loading) {
      form = <Spinner />;
    }

    let errorMsg = null;
    if (this.props.error) {
      errorMsg = <p>{this.props.error.message}</p>;
    }

    let authRedirect = null;
    if (this.props.isAuth) {
      authRedirect = <Redirect to={this.props.authRedirectPath}></Redirect>;
    }

    return (
      <React.Fragment>
        <div className="row mt-8">
          <div className="col-6 m-auto">
          {authRedirect}
          {errorMsg && <div class="alert alert-danger" role="alert">
          {errorMsg}
          </div>}
          <form className="">
            {form}
            <div className="row justify-content-around">
              <div className="col-12 col-md-4">
              <button
                type="button"
                className="btn btn-danger w-100 m-2"
                onClick={this.submitHandler}
              >
                {this.state.isSignUp ? "SIGN UP" : "LOGIN"}
              </button>
              </div>
              <div className="col-12 col-md-4">
              <button type="button" onClick={this.switchAuthModeHandler} className="btn btn-success w-100 m-2">SWITCH TO {this.state.isSignUp ? "LOGIN" : "SIGN UP"}</button>
              </div>
              </div>
          </form>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuth: state.auth.token !== null,
    building: state.burgerBuilder.building,
    authRedirectPath: state.auth.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onAuth: (email, password, isSignUp) =>
      dispatch(actions.auth(email, password, isSignUp)),
    onSetRedirectPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
