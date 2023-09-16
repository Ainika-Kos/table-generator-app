import './SelectField.sass';
import { useState, useEffect } from 'react';
import cities from '../../data/cities';
import arrowIcon from '../../assets/arrowIcon.svg'

const SelectField = ({ name, onChange, value, isControlledInput, errorStyle }) => {
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
    <div className={`App__custom-select ${isOpen ? 'open' : ''} ${errorStyle}`} data-testid='memberCity-wrapper'>
      <div className={`App__selected-option ${selectedValue? 'selected' : ''}`} onClick={() => setIsOpen(!isOpen)} data-testid='memberCity'>
        {selectedValue || 'City'}
        <span className={`App__custom-select__arrow ${isOpen ? 'opened' : ''}`}>
          <img src={arrowIcon} alt="Arrow Icon" />
        </span>
      </div>
      <ul className="App__options">
        <li onClick={() => handleSelect('City')} key="">
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