import React from "react";
import ReactDOM from "react-dom/client";
import "@fontsource/hanken-grotesk/300.css";
import "@fontsource/hanken-grotesk/400.css";
import "@fontsource/hanken-grotesk/500.css";
import "@fontsource/hanken-grotesk/600.css";
import "@fontsource/hanken-grotesk/700.css";
import "./styles/global.css";
import Privacy from "./pages/Privacy";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Privacy />
  </React.StrictMode>
);
