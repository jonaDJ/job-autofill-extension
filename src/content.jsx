// src/content.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import pagesCss from "./App.css?raw";
import { jobSitePatterns } from "./utils/jobSitePatterns";

const isJobSite = jobSitePatterns.some((pattern) =>
  pattern.test(window.location.href)
);

if (isJobSite) {
  const appRoot = document.createElement("div");
  appRoot.id = "job-extension-root";
  appRoot.className = "job-extension-parent";
  document.body.appendChild(appRoot);

  const style = document.createElement("style");
  style.textContent = pagesCss;
  document.head.appendChild(style);

  ReactDOM.createRoot(appRoot).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
