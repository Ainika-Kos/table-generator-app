import './Button.sass';

const Button = ({ buttonType, buttonClass, buttonText }) => {
  return (
    <button
      type={buttonType}
      className={buttonClass}
    >
      {buttonText}
    </button>
  );
};

export default Button;