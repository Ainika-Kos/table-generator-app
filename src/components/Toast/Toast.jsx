import './Toast.sass';
const Toast = ({ toastText, toastClass }) => {

  return (
    <div className={`App__toast-container ${toastClass}`}>
      <p>{toastText}</p>
    </div>
  );
};

export default Toast;