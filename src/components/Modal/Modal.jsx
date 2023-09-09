import './Modal.sass';
import { useState, useEffect } from 'react';
import Button from '../Button/Button';
import InputField from '../InputField/InputField';
import SelectField from '../SelectField/SelectField';

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
        <InputField
          name='memberName'
          placeholder='Name'
          onChange={handleAddMemberChange}
          value={existingMemberData.memberName}
          isControlledInput={false}
        />
        <InputField
          name='memberSurname'
          placeholder='Surname'
          onChange={handleAddMemberChange}
          value={existingMemberData.memberSurname}
          isControlledInput={false}
        />
        <InputField
          name='memberAge'
          placeholder='Age'
          onChange={handleAddMemberChange}
          value={existingMemberData.memberAge}
          isControlledInput={false}
        />
        <SelectField
          name='memberCity'
          placeholder='City'
          onChange={handleAddMemberChange}
          value={existingMemberData.memberCity}
          isControlledInput={false}
        />
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