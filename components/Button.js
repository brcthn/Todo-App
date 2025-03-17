const Button = ({ type, text, className, onClick }) => {
  return (
    <div>
      <button type={type} className={className} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default Button;
