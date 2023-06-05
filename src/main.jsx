import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";
import MovieProvider from "./contexts/MovieContext.jsx";
import UserProvider from "./contexts/UserContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MovieProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </MovieProvider>
  </React.StrictMode>
);
