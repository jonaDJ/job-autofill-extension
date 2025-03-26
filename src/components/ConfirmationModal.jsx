import React from "react";
import ActionButton from "./ActionButton";

const ConfirmationModal = ({ message, onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[10002]">
      <div className="bg-white p-4 rounded-lg shadow-lg w-[90%]">
        <p className="text-md text-gray-800 mb-4">{message}</p>
        <div className="flex justify-end gap-4">
          <ActionButton
            name="Cancel"
            onClick={onCancel}
            className="bg-gray-300 text-gray-700 hover:bg-gray-400"
          />
          <ActionButton
            name="Confirm"
            onClick={onConfirm}
            className="bg-red-600 text-white hover:bg-red-700"
          />
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
