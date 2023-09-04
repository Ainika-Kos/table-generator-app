import './Form.sass';
import { useState, useEffect } from 'react';
import InputField from '../InputField/InputField';
import SelectField from '../SelectField/SelectField';
import Button from '../Button/Button';

const Form = ({ addMemberData, handleAddMemberChange, handleAddMemberSubmit }) => {

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
      />
      <InputField
        name='memberSurname'
        placeholder='Surname'
        onChange={handleAddMemberChange}
        value={addMemberData.memberSurname}
      />
      <InputField
        name='memberAge'
        placeholder='Age'
        onChange={handleAddMemberChange}
        value={addMemberData.memberAge}
      />
      <SelectField
        name='memberCity'
        placeholder='City'
        onChange={handleAddMemberChange}
        value={addMemberData.memberCity}
      />
      <Button
        buttonType='submit'
        buttonClass='btn'
        buttonText='Add'
        buttonDisabled={!formisValid}
        onClick={handleAddMemberSubmit}
      />
    </form>
  );
};

export default Form;