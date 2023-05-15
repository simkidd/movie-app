import React from "react";
import "./buttons.scss";

const Button = ({className, onClick, type, children}) => {
  return <button type={type} className={`btn ${className} small` } onClick={onClick}>{children}</button>;
};

export const OutlineButton = ({children, onClick, className, type}) => {
  return <button type={type} className={`btn btn__outline small ${className}`} onClick={onClick}>{children}</button>;
};

export default Button;
