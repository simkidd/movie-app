import React from "react";
import "./buttons.scss";

const Button = ({title, className, onClick}) => {
  return <button className={`btn ${className}`} onClick={onClick}>{title}</button>;
};

export const OutlineButton = ({title, onClick, className}) => {
  return <button className={`btn btn__outline small ${className}`} onClick={onClick}>{title}</button>;
};

export default Button;
