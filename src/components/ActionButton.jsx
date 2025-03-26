const ActionButton = ({ name, onClick, className = "" }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`py-2  px-6 font-semibold rounded-md transition-colors duration-200 ${className}`}
    >
      <span className="text-center">{name}</span>
    </button>
  );
};

export default ActionButton;
