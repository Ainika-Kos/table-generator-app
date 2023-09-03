import './App.sass';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import TableRow from './TableRow';
import InputField from './InputField';

function App() {

  const [members, setMembers] = useState([]);
  const [addMemberData, setAddMemberData] = useState({
    id: '',
    memberName: '',
    memberSurname: '',
    memberAge: '',
    memberCity: ''
  });

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
        <InputField
          name='memberCity'
          placeholder='City'
          onChange={handleAddMemberChange}
          value={addMemberData.memberCity}
        />
        <button type='submit' className='App__form__button'>Add</button>
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
