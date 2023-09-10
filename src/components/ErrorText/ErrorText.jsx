import './ErrorText.sass';

const ErrorText = ({ errorText }) => {
    return (
        <p className='App__form__error-text'>{errorText}</p>
    );
};

export default ErrorText;