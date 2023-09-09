import './Modal.sass';
import { useState, useEffect } from 'react';
import cities from '../../data/cities';
import Button from '../Button/Button';

const Modal = ({ existingMemberData, handleAddMemberChange, handleEditMemberSubmit, handleCloseModal }) => {

  const [formisValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const validateForm = () => {
      const result = !!existingMemberData.memberName && !!existingMemberData.memberSurname && !!existingMemberData.memberAge && !!existingMemberData.memberCity;
      return result;
    };

    const isValidForm = validateForm();
    setFormIsValid(isValidForm);

  }, [existingMemberData]);

  return (
    <div
      className='App__modal-container'
      onClick={(e) => { if (e.target.className === 'App__modal-container') handleCloseModal()}}
    >
      <form className='App__form'>
        <input
          name='memberName'
          placeholder='Name'
          onChange={handleAddMemberChange}
          defaultValue={existingMemberData.memberName}
        />
        <input
          name='memberSurname'
          placeholder='Surname'
          onChange={handleAddMemberChange}
          defaultValue={existingMemberData.memberSurname}
        />
        <input
          name='memberAge'
          placeholder='Age'
          onChange={handleAddMemberChange}
          defaultValue={existingMemberData.memberAge}
        />
        <select
          name='memberCity'
          onChange={handleAddMemberChange}
          defaultValue={existingMemberData.memberCity}
          required='required'
        >
          <option value="">City</option>
          {cities.map((city) => (
            <option
              key={city.id}
              value={city.cityName}
            >
              {city.cityName}
            </option>
          ))}
        </select>
        <Button
          buttonType='submit'
          buttonClass='btn'
          buttonText='Save'
          buttonDisabled={!formisValid}
          onClick={handleEditMemberSubmit}
        />
        <Button
          buttonType='submit'
          buttonClass='btn'
          buttonText='Cancel'
          buttonDisabled={false}
          onClick={handleCloseModal}
        />
      </form>
    </div>
  );
};

export default Modal;