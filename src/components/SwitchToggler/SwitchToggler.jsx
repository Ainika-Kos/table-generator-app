import './SwitchToggler.sass';

const SwitchToggler = ({ isDarkTheme, onChange }) => {
  return (
    <div className='App__switch-wrapper'>
      <span className='App__switch-title'>Light</span>
      <div class={`App__switch ${isDarkTheme ? 'active' : ''}`}>
        <input class="App__switch-check" type="checkbox" onChange={onChange} />
        <span class="App__switch-toggle"></span>
      </div>
      <span className='App__switch-title'>Dark</span>
    </div>
  );
};

export default SwitchToggler;