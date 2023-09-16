import './Toast.sass';
const Toast = ({ toastText, toastStatus }) => {

  return (
    <div className={`App__toast-container ${toastStatus}`}>
      <span className='App__toast-title'>{toastStatus}</span>
      <p className='App__toast-text'>{toastText}</p>
    </div>
  );
};

export default Toast;