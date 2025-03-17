import "./index.css";
import React, { useState } from "react";
import Home from "./Pages/Home";
import ProfileEdit from "./Pages/ProfileEdit";
import Profile from "./Pages/Profile";
import { FaUserPlus, FaRegUserCircle, FaTimes, FaMagic } from "react-icons/fa";
import logo from "./assets/logo.png";
import { ProfileProvider } from "./contexts/ProfileProvider";

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
    <ProfileProvider>
      {panelOpen ? (
        <div className="fixed top-5 right-0 bg-white border border-gray-300 rounded-tl-lg rounded-bl-lg shadow-lg z-[1001] w-[400px]">
          <div className="flex items-center justify-between">
            <h1 className="text-lg font-bold text-red-800 pl-2">Autofill</h1>
            <ul className="flex justify-end gap-0.5 list-none p-0 m-0">
              {tabs.map((tab) => (
                <li
                  key={tab.id}
                  className={`border-none cursor-pointer text-black text-xl p-3 bg-transparent rounded-md list-none ${
                    currentPage === tab.id ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(tab.id)}
                >
                  {tab.icon}
                </li>
              ))}
              <li
                className="border-none cursor-pointer text-black text-xl p-3 bg-transparent rounded-md list-none"
                onClick={closePanel}
              >
                <FaTimes />
              </li>
            </ul>
          </div>

          {tabs.find((tab) => tab.id === currentPage)?.component}
        </div>
      ) : (
        <button
          className="fixed top-5 right-0 w-[55px] h-[65px] bg-red-600 border-none rounded-tl-lg rounded-bl-lg cursor-pointer shadow-md flex justify-center items-center hover:bg-400 hover:shadow-lg z-50"
          onClick={openPanel}
        >
          <img
            src={logo}
            alt="Logo"
            className="block h-[50px] transition-transform duration-200 ease-in-out hover:scale-110"
          />
        </button>
      )}
    </ProfileProvider>
  );
}

export default App;
