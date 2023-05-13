import React from "react";
import "./buttons.scss";

const Button = ({title, className, onClick, type}) => {
  return <button type={type} className={`btn ${className} small` } onClick={onClick}>{title}</button>;
};

export const OutlineButton = ({title, onClick, className, type}) => {
  return <button type={type} className={`btn btn__outline small ${className}`} onClick={onClick}>{title}</button>;
};

export default Button;
