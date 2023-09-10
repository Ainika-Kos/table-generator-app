import './Form.sass';
import { useState, useEffect } from 'react';
import validationProperties from '../../data/validationSettings';
import InputField from '../InputField/InputField';
import SelectField from '../SelectField/SelectField';
import Button from '../Button/Button';
import ErrorText from '../ErrorText/ErrorText';

const Form = ({ addMemberData, handleAddMemberChange, handleAddMemberSubmit, isControlledInput, buttonText }) => {

  const [formisValid, setFormIsValid] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const validateForm = () => {

      let newErrors = {};

      if (addMemberData.memberName && addMemberData.memberName.length < validationProperties.find(item => item.errorName === 'name').characters) {
        newErrors = { ...newErrors, name: validationProperties.find(item => item.errorName === 'name').errorText };
      }
      
      if (addMemberData.memberSurname && addMemberData.memberSurname.length < validationProperties.find(item => item.errorName === 'surname').characters) {
        newErrors = { ...newErrors, surname: validationProperties.find(item => item.errorName === 'surname').errorText };
      }

      if (addMemberData.memberAge && addMemberData.memberAge < validationProperties.find(item => item.errorName === 'age').characters) {
        newErrors = { ...newErrors, age: validationProperties.find(item => item.errorName === 'age').errorText };
      }
      
      if (addMemberData.memberCity && addMemberData.memberCity === 'City') {
        newErrors = { ...newErrors, city: validationProperties.find(item => item.errorName === 'city').errorText };
      }

      setErrors(newErrors);

      const emptyForm = !!addMemberData.memberName && !!addMemberData.memberSurname && !!addMemberData.memberAge && !!addMemberData.memberCity;
      const isValidForm = Object.keys(newErrors).length === 0 && emptyForm;

      setFormIsValid(isValidForm);
    };

    validateForm();

  }, [addMemberData]);

  return (
    <form className='App__form'>
      <InputField
        name='memberName'
        type='text'
        placeholder='Name'
        onChange={handleAddMemberChange}
        value={addMemberData.memberName}
        isControlledInput={isControlledInput}
      />
      <InputField
        name='memberSurname'
        type='text'
        placeholder='Surname'
        onChange={handleAddMemberChange}
        value={addMemberData.memberSurname}
        isControlledInput={isControlledInput}
      />
      <InputField
        name='memberAge'
        type='number'
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
      {Object.keys(errors).length > 0 && (
        <div className='App__form__error-wrapper'>
          {Object.keys(errors).map((key) => (
            <ErrorText
              key={key}
              errorText={errors[key]}
            />
          ))}
        </div>
      )}
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