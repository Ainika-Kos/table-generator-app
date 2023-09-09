import cities from '../../data/cities';
import './SelectField.sass';
import { useState, useEffect } from 'react';

const SelectField = ({ name, onChange, value, isControlledInput }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value);

  useEffect(() => {
    setSelectedValue(value);
  }, [value]);

  const handleSelect = (option) => {
    if (!isControlledInput) {
      setSelectedValue(option);
    }
    const event = {
      target: {
        name,
        value: option,
      },
      preventDefault: () => { },
    };
    onChange(event);
    setIsOpen(false);
  };

  return (
    <div className={`App__custom-select ${isOpen ? 'open' : ''}`}>
      <div className={`App__selected-option ${selectedValue? 'selected' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        {selectedValue || 'City'}
      </div>
      <ul className="App__options">
        <li onClick={() => handleSelect('')} key="">
          City
        </li>
        {cities.map(({id, cityName}) => (
          <li
            key={id}
            onClick={() => handleSelect(cityName)}
          >
            {cityName}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SelectField;