import React from "react";

const order = (props) => {
  let ingredients = [];
  for (let ingName in props.ingredients) {
    ingredients.push({ name: ingName, amount: props.ingredients[ingName] });
  }

  const ingredientOutput = ingredients.map((ig) => {
    return (
      <span className="lead">
        {ig.name}({ig.amount}){" "}
      </span>
    );
  });
  return (
    <div className="card bg-light text-dark mt-4">
      <div className="card-header">
        <div className="card-title text-center h5 font-weight-bold">Your Order</div>
      </div>
      <div className="card-body">
        <p>Ingredients: {ingredientOutput}</p>
        <p>
          Price: <strong>USD {props.price.toFixed(2)}</strong>
        </p>
      </div>
    </div>
  );
};
export default order;
