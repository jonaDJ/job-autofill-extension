import "./index.css";
import React, { useState } from "react";
import Home from "./Pages/Home";
import ProfileEdit from "./Pages/ProfileEdit";
import Profile from "./Pages/Profile";
import { FaUserPlus, FaRegUserCircle, FaTimes, FaMagic } from "react-icons/fa";
import logo from "./assets/logo.png";

function App() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const openPanel = () => {
    setPanelOpen(true);
  };

  const closePanel = () => {
    setPanelOpen(false);
  };

  const tabs = [
    { id: 1, label: "Autofill", icon: <FaMagic />, component: <Home /> },
    { id: 2, label: "Edit", icon: <FaUserPlus />, component: <ProfileEdit /> },
    { id: 3, label: "Data", icon: <FaRegUserCircle />, component: <Profile /> },
  ];

  return (
    <div>
      {panelOpen ? (
        <div className="chrome-extension-panel">
          <ul className="chrome-extension-navigation">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                className={`chrome-extension-nav-button ${
                  currentPage === tab.id ? "active" : ""
                }`}
                onClick={() => setCurrentPage(tab.id)}
              >
                {tab.icon}
              </li>
            ))}
            <li className="chrome-extension-nav-button" onClick={closePanel}>
              <FaTimes />
            </li>
          </ul>

          {tabs.find((tab) => tab.id === currentPage)?.component}
        </div>
      ) : (
        <button className="chrome-extension-open-button" onClick={openPanel}>
          <img src={logo} alt="Logo" />
        </button>
      )}
    </div>
  );
}

export default App;
