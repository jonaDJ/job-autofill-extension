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

  const showPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      {panelOpen ? (
        <div className="chrome-extension-panel">
          <div className="chrome-extension-navigation">
            <button
              className="chrome-extension-nav-button"
              onClick={() => showPage(1)}
            >
              <FaMagic />
            </button>
            <button
              className="chrome-extension-nav-button"
              onClick={() => showPage(2)}
            >
              <FaUserPlus />
            </button>
            <button
              className="chrome-extension-nav-button"
              onClick={() => showPage(3)}
            >
              <FaRegUserCircle />
            </button>
            <button
              className="chrome-extension-nav-button"
              onClick={closePanel}
            >
              <FaTimes />
            </button>
          </div>
          {currentPage === 1 && <Home />}
          {currentPage === 2 && <ProfileEdit />}
          {currentPage === 3 && <Profile />}
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
