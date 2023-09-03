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
    <div className="App">
      <table className="App__table">
        <thead className="App__thead">
          <tr>
            <th>Name</th>
            <th>Surname</th>
            <th>Age</th>
            <th>City</th>
          </tr>
        </thead>
        <tbody className="App__tbody">
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
