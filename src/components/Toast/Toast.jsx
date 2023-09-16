import './Toast.sass';
import errorIcon from '../../assets/errorIcon.svg';
import infoIcon from '../../assets/infoIcon.svg';
import successIcon from '../../assets/successIcon.svg';

const Toast = ({ toastText, toastStatus }) => {

  const statusIcons = {
    error: errorIcon,
    info: infoIcon,
    success: successIcon
  }

  const toastIconSrc = statusIcons[toastStatus];
  const toastStatusText = toastStatus.charAt(0).toUpperCase() + toastStatus.slice(1);

  return (
    <div className={`App__toast-container ${toastStatus}`}>
      <span className='App__toast-icon'>
        <img src={toastIconSrc} alt={`${toastStatus} Icon`} />
      </span>
      <div className='App__toast-text-wrapper'>
        <p className='App__toast-title'>{toastStatusText}</p>
        <p className='App__toast-text'>{toastText}</p>
      </div>
    </div>
  );
};

export default Toast;