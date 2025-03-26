import "./index.css";
import React, { useState } from "react";
import Home from "./Pages/Home";
import ProfileEdit from "./Pages/ProfileEdit";
import Profile from "./Pages/Profile";
import { FaPencilAlt, FaUser, FaTimes, FaRocket } from "react-icons/fa";
import logo from "./assets/logo.png";

function App() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [step, setStep] = useState(1);
  const [isCloseButtonVisible, setIsCloseButtonVisible] = useState(false);

  const openPanel = () => setPanelOpen(true);
  const closePanel = () => setPanelOpen(false);

  const tabs = [
    { id: 1, label: "Autofill", icon: <FaRocket />, component: <Home /> },
    {
      id: 2,
      label: "Edit",
      icon: <FaPencilAlt />,
      component: <ProfileEdit step={step} setStep={setStep} />,
    },
    {
      id: 3,
      label: "Data",
      icon: <FaUser />,
      component: <Profile setCurrentPage={setCurrentPage} setStep={setStep} />,
    },
  ];
  return (
    <div
      className="relative"
      onKeyDown={(e) => e.key === "Escape" && closePanel()}
    >
      <div
        className={`fixed top-5 bg-white border-2 border-gray-200 rounded-tl-lg rounded-bl-lg shadow-lg z-[10001] w-[500px] transition-transform duration-300 ${
          panelOpen ? "right-5 translate-x-0" : "right-0 translate-x-full"
        }`}
        onMouseEnter={() => setIsCloseButtonVisible(true)}
        onMouseLeave={() => setIsCloseButtonVisible(false)}
      >
        {isCloseButtonVisible && (
          <button
            className="absolute -top-2 -left-2 w-7 h-7 bg-white border-2 border-gray-900 text-black rounded-full flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors"
            onClick={closePanel}
          >
            <FaTimes className="text-md w-full" />
          </button>
        )}

        <div className="flex items-center justify-between px-4 py-1 border-b border-gray-200">
          <h1
            role="button"
            tabIndex={0}
            onClick={() => setCurrentPage(1)}
            className="text-xl cursor-pointer font-bold bg-gradient-to-r from-red-900 via-red-700 to-red-600 text-transparent bg-clip-text drop-shadow-[0_0_10px_rgba(255,0,0,0.7)] tracking-wider"
          >
            Autofill
          </h1>

          <ul className="flex gap-1">
            {tabs.map((tab) => (
              <li
                key={tab.id}
                tabIndex={0}
                role="button"
                className={`cursor-pointer text-lg p-2 rounded-full transition-colors ${
                  currentPage === tab.id
                    ? "bg-red-600 text-white"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
                onClick={() => setCurrentPage(tab.id)}
              >
                {tab.icon}
              </li>
            ))}
          </ul>
        </div>

        <div className="overflow-y-auto max-h-[70vh] custom-scrollbar p-4">
          {tabs.find((tab) => tab.id === currentPage)?.component}
        </div>
      </div>

      <button
        className={`fixed top-5 right-0 w-16 h-20 bg-red-600 text-white border-none rounded-tl-lg rounded-bl-lg cursor-pointer shadow-md flex justify-center items-center z-[10001] transition-transform duration-300 hover:bg-red-700 ${
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
