import './App.sass';
import { useState } from 'react';

const membersData = [
  {
    'id': 1,
    'name': 'Nanana',
    'surname': 'Lalala',
    'age': 28,
    'city': 'Carnikava'
  },
  {
    'id': 2,
    'name': 'Hello',
    'surname': 'Sunshine',
    'age': 36,
    'city': 'Gauja'
  }
];

function App() {

  const [members, setMembers] = useState(membersData);

  return (
    <div className='App'>
      <form className='App__form'>
        <input
          type='text'
          name='fullName'
          required='required'
          placeholder='Name'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Name'}
        />
        <input
          type='text'
          name='fullSurName'
          required='required'
          placeholder='Surname'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Surname'}
        />
        <input
          type='number'
          name='age'
          required='required'
          placeholder='Age'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'Age'}
        />
        <input
          type='text'
          name='city'
          required='required'
          placeholder='City'
          onFocus={(e) => e.target.placeholder = ''}
          onBlur={(e) => e.target.placeholder = 'City'}
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
          {members.map(({name, surname, age, city}) => (
            <tr>
              <td>{name}</td>
              <td>{surname}</td>
              <td>{age}</td>
              <td>{city}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
