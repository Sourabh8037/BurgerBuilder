import React from "react";
import "./Burger.css";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredient";

const burger = (props) => {
  // CONVERTING OBJECT INTO ARRAY ELEMENTS
  let transformIngredients = Object.keys(props.ingredients)
    .map((igKey) =>
      [...Array(props.ingredients[igKey])].map((_, i) => (
        <BurgerIngredient key={igKey + i} type={igKey} />
      ))
    )
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  if (transformIngredients.length === 0) {
    transformIngredients = (
      <div className="font-12">Please Start Adding Ingredients</div>
    );
  }
  return (
    <div className={"container1"}>
      <div className="Burger">
        <BurgerIngredient type="bread-top" />
        {transformIngredients}
        <BurgerIngredient type="bread-bottom" />
      </div>
    </div>
  );
};

export default burger;
