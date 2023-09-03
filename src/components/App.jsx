import './App.sass';
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import TableRow from './TableRow/TableRow';
import InputField from './InputField/InputField';
import SelectField from './SelectField/SelectField';
import Button from './Button/Button';

function App() {

  const [members, setMembers] = useState([]);
  const [formisValid, setFormIsValid] = useState(false);
  const [addMemberData, setAddMemberData] = useState({
    id: '',
    memberName: '',
    memberSurname: '',
    memberAge: '',
    memberCity: ''
  });

  useEffect(() => {
    const isValidForm = validateForm();
    setFormIsValid(isValidForm);

  }, [addMemberData]);

  const handleAddMemberChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    setAddMemberData({ ...addMemberData, [name]: value });

  };

  const handleAddMemberSubmit = (e) => {
    e.preventDefault();

    const newMemberId = uuid();

    const newMember = {
      id: newMemberId,
      memberName: addMemberData.memberName,
      memberSurname: addMemberData.memberSurname,
      memberAge: addMemberData.memberAge,
      memberCity: addMemberData.memberCity
    };

    handleAddMember(newMember);
  };

  const handleAddMember = (newMember) => {
    const newMembers = [...members, newMember];
    setMembers(newMembers);
    setAddMemberData({
      id: '',
      memberName: '',
      memberSurname: '',
      memberAge: '',
      memberCity: '',
    });
  };

  const validateForm = () => {
    const result = !!addMemberData.memberName && !!addMemberData.memberSurname && !!addMemberData.memberAge && !!addMemberData.memberCity;
    return result;
  };

  return (
    <div className='App'>
      <form className='App__form' onSubmit={handleAddMemberSubmit}>
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
          buttonClass='App__button'
          buttonText='Add'
          buttonDisabled={!formisValid}
        />
      </form>
      <table className='App__table'>
        <thead className='App__thead'>
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Age</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody className='App__tbody'>
          {members.map((member) => (
            <TableRow member={member} key={member.id}/>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
