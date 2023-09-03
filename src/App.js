import './App.sass';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';

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
        <input
          type='text'
          name='memberName'
          required='required'
          placeholder='Name'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Name'}
          onChange={handleAddMemberChange}
          value={addMemberData.memberName}
        />
        <input
          type='text'
          name='memberSurname'
          required='required'
          placeholder='Surname'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Surname'}
          onChange={handleAddMemberChange}
          value={addMemberData.memberSurname}
        />
        <input
          type='text'
          name='memberAge'
          required='required'
          placeholder='Age'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Age'}
          onChange={handleAddMemberChange}
          value={addMemberData.memberAge}
        />
        <input
          type='text'
          name='memberCity'
          required='required'
          placeholder='City'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'City'}
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
          {members.map(({id, memberName, memberSurname, memberAge, memberCity}) => (
            <tr key={id}>
              <td>{memberName}</td>
              <td>{memberSurname}</td>
              <td>{memberAge}</td>
              <td>{memberCity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
