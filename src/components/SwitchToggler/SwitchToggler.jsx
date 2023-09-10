import './SwitchToggler.sass';

const SwitchToggler = ({ isDarkTheme, onChange }) => {
    return (
        <div class={`App__switch ${isDarkTheme ? 'active' : ''}`}>
            <input class="App__switch__check" type="checkbox" onChange={onChange} />
            <span class="App__switch__toggle"></span>
        </div>
    );
};

export default SwitchToggler;