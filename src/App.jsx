import "./index.css";
import React, { useState } from "react";
import Home from "./Pages/Home";
import ProfileEdit from "./Pages/ProfileEdit";
import Profile from "./Pages/Profile";
import { FaEdit, FaDatabase, FaTimes, FaRocket } from "react-icons/fa";
import logo from "./assets/logo.png";

function App() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCloseButtonVisible, setIsCloseButtonVisible] = useState(false);

  const openPanel = () => setPanelOpen(true);
  const closePanel = () => setPanelOpen(false);

  const tabs = [
    { id: 1, label: "Autofill", icon: <FaRocket />, component: <Home /> },
    { id: 2, label: "Edit", icon: <FaEdit />, component: <ProfileEdit /> },
    { id: 3, label: "Data", icon: <FaDatabase />, component: <Profile /> },
  ];

  return (
    <div className="relative">
      <div
        className={`fixed top-5 right-0 bg-white border border-gray-300 rounded-tl-lg rounded-bl-lg shadow-lg z-[10001] w-[400px] transition-transform duration-300 ${
          panelOpen ? "translate-x-0" : "translate-x-full"
        }`}
        onMouseEnter={() => setIsCloseButtonVisible(true)}
        onMouseLeave={() => setIsCloseButtonVisible(false)}
      >
        {isCloseButtonVisible && (
          <button
            className="absolute -top-2 -left-2 w-7 h-7 border-2 bg-white border-gray-900 text-black rounded-full flex items-center justify-center cursor-pointer hover:text-red-800 transition-colors"
            onClick={closePanel}
          >
            <FaTimes className="text-md w-full" />
          </button>
        )}
        <div className="flex items-center justify-between p-2 border-b pt-4">
          <h1 className="text-lg font-bold text-red-800 w-full">Autofill</h1>
          <ul className="flex justify-end gap-1 w-full">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                className={`cursor-pointer text-xl p-3 transition-transform transform hover:scale-110 ${
                  currentPage === tab.id ? "text-red-600" : "text-black"
                }`}
                onClick={() => setCurrentPage(tab.id)}
              >
                {tab.icon}
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-y-auto max-h-[70vh] custom-scrollbar">
          {tabs.find((tab) => tab.id === currentPage)?.component}
        </div>
      </div>

      <button
        className={`fixed top-5 right-0 w-[55px] h-[65px] bg-red-600 text-white border-none rounded-tl-lg rounded-bl-lg cursor-pointer shadow-md flex justify-center items-center z-[10001] transition-transform duration-300 ${
          panelOpen ? "translate-x-full" : "translate-x-0"
        }`}
        onClick={openPanel}
      >
        <img src={logo} alt="logo" />
      </button>
    </div>
  );
}

export default App;
