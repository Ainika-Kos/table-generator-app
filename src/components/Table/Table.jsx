import './Table.sass';
import TableRow from '../TableRow/TableRow';

const Table = ({ members, handleEditMember, handleDeletetMember }) => {
  return (
    <table className='App__table'>
      <thead className='App__thead'>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th>Age</th>
          <th>City</th>
          <th></th>
        </tr>
      </thead>
      <tbody className='App__tbody'>
        {members.map((member) => (
          <TableRow
            member={member}
            key={member.id}
            editHandle={() => handleEditMember(member.id)}
            deleteHandle={() => handleDeletetMember(member.id)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;