import React from "react";

const input = (props) => {
  let inputElement = null;
  const inputClasses = ["form-control-lg form-control"];
  if (props.valid) {
    inputClasses.push(" is-valid");
  } else if (props.touched) {
    inputClasses.push("is-invalid");
  }
  switch (props.elementType) {
    case "input":
      inputElement = (
        <input
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    case "select":
      inputElement = (
        <select className={inputClasses.join(" ")} value={props.value}>
          {props.elementConfig.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.displayValue}
            </option>
          ))}
        </select>
      );
      break;
    case "textarea":
      inputElement = (
        <textarea
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
      break;
    default:
      inputElement = (
        <input
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
      );
  }

  return (
    <div className="form-group">
      <label className="lead">{props.label}</label>
      {inputElement}
    </div>
  );
};
export default input;
