import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { jobSitePatterns } from "./utils/jobSitePatterns";

const isJobSite = jobSitePatterns.some((pattern) =>
  pattern.test(window.location.href)
);

if (isJobSite) {
  const appRoot = document.createElement("div");
  appRoot.id = "job-extension-root";
  appRoot.className = "job-extension-parent";
  document.body.appendChild(appRoot);

  ReactDOM.createRoot(appRoot).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
