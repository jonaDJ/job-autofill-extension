import React from "react";

interface ResumeModalProps {
  resume: string;
  onClose: () => void;
}

const ResumeModal: React.FC<ResumeModalProps> = ({ resume, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
      <div className="bg-white p-5 rounded-lg shadow-xl w-full max-w-3xl relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 transition-all duration-200 text-xl"
          onClick={onClose}
        >
          ✕
        </button>
        <h2 className="text-lg font-semibold text-gray-800 mb-3 text-center">
          Resume Preview
        </h2>
        <iframe
          src={resume}
          className="w-full h-[500px] border border-gray-200 rounded-md"
          title="Resume Preview"
        />
      </div>
    </div>
  );
};

export default ResumeModal;
