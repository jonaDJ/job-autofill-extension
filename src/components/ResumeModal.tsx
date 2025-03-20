import React from "react";
import { FaTimes } from "react-icons/fa";

interface ResumeModalProps {
  resume: string;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ resume, onClose }) => {
  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white p-6 rounded-lg shadow-xl relative w-full  max-h-[95%] flex flex-col">
        <button
          className="absolute top-3 right-3 text-red-700 cursor-pointer hover:text-red-900 transition"
          onClick={onClose}
        >
          <FaTimes className="text-2xl" />
        </button>

        <h2 className="text-lg font-semibold mb-4 text-center">
          Resume Preview
        </h2>

        <div className="overflow-y-auto custom-scrollbar flex-grow border border-gray-300 rounded-md">
          <iframe
            src={resume}
            className="w-full h-[500px]"
            title="Resume Preview"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeModal;
