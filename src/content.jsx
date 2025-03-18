import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const appRoot = document.createElement("div");
appRoot.id = "job-extension-root";
appRoot.className = "job-extension-parent";

document.body.appendChild(appRoot);

ReactDOM.createRoot(appRoot).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
