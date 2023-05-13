import React from "react";

const NotFound = () => {
  return (
    <div 
    style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection:'column',
          height: "100vh",
        }}>
      <h1>404</h1>
      <p>Page not found</p>
    </div>
  );
};

export default NotFound;
