import './SwitchToggler.sass';

const SwitchToggler = ({ isDarkTheme, onChange }) => {
  return (
    <div className='App__switch-wrapper' data-testid='switch-toggler'>
      <span className='App__switch-title'>Light</span>
      <div className={`App__switch ${isDarkTheme ? 'active' : ''}`}>
        <input className="App__switch-check" type="checkbox" onChange={onChange} data-testid='switch-toggler-input'/>
        <span className="App__switch-toggle"></span>
      </div>
      <span className='App__switch-title'>Dark</span>
    </div>
  );
};

export default SwitchToggler;