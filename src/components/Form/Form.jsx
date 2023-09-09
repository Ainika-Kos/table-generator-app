import './Form.sass';
import { useState, useEffect } from 'react';
import InputField from '../InputField/InputField';
import SelectField from '../SelectField/SelectField';
import Button from '../Button/Button';

const Form = ({ addMemberData, handleAddMemberChange, handleAddMemberSubmit, isControlledInput, buttonText }) => {

  const [formisValid, setFormIsValid] = useState(false);

  useEffect(() => {
    const validateForm = () => {
      const result = !!addMemberData.memberName && !!addMemberData.memberSurname && !!addMemberData.memberAge && !!addMemberData.memberCity;
      return result;
    };

    const isValidForm = validateForm();
    setFormIsValid(isValidForm);

  }, [addMemberData]);

  return (
    <form className='App__form'>
      <InputField
        name='memberName'
        placeholder='Name'
        onChange={handleAddMemberChange}
        value={addMemberData.memberName}
        isControlledInput={isControlledInput}
      />
      <InputField
        name='memberSurname'
        placeholder='Surname'
        onChange={handleAddMemberChange}
        value={addMemberData.memberSurname}
        isControlledInput={isControlledInput}
      />
      <InputField
        name='memberAge'
        placeholder='Age'
        onChange={handleAddMemberChange}
        value={addMemberData.memberAge}
        isControlledInput={isControlledInput}
      />
      <SelectField
        name='memberCity'
        placeholder='City'
        onChange={handleAddMemberChange}
        value={addMemberData.memberCity}
        isControlledInput={isControlledInput}
      />
      <Button
        buttonType='submit'
        buttonClass='btn'
        buttonText={buttonText}
        buttonDisabled={!formisValid}
        onClick={handleAddMemberSubmit}
      />
    </form>
  );
};

export default Form;