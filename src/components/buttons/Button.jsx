import React from "react";
import "./buttons.scss";

const Button = ({title}) => {
  return <button className="btn">{title}</button>;
};

export const OutlineButton = ({title}) => {
  return <button className="btn btn__outline small">{title}</button>;
};

export default Button;
