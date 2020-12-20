import React from "react";
import Burger from "../../Burger/Burger";
const checkoutSummary = (props) => (
  <div
    className="d-flex flex-column justify-content-center align-items-center text-align-cetner"
    style={{ margin: "8rem 0 2rem 0" }}
  >
    <h1 className="text-center mx-3">We hope it tastes well!</h1>
    <div style={{ width: "100%", height: "100%", margin: "auto" }}>
      <Burger ingredients={props.ingredients}></Burger>
    </div>
    <div className="d-flex w-100 align-items-center justify-content-center">
      <button
        className="btn btn-outline-danger mx-2"
        onClick={props.checkoutSummaryCancelled}
      >
        CANCEL
      </button>
      <button
        className="btn btn-outline-success mx-2"
        onClick={props.checkoutSummaryContinued}
      >
        CONTINUE
      </button>
    </div>
  </div>
);

export default checkoutSummary;
