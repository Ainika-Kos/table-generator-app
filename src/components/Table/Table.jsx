import './Table.sass';
import TableRow from '../TableRow/TableRow';

const Table = ({ members, handleEditMember, handleDeletetMember, tableId }) => {
  return (
    <table className='App__table' data-testid='table'>
      <thead className='App__thead'>
        <tr>
          <th>Name</th>
          <th>Surname</th>
          <th className='narrow'>Age</th>
          <th>City</th>
          <th></th>
        </tr>
      </thead>
      <tbody className='App__tbody'>
        {members.map((member) => (
          <TableRow
            member={member}
            key={member.id}
            editHandle={() => handleEditMember(member.id, tableId)}
            deleteHandle={() => handleDeletetMember(member.id, tableId)}
          />
        ))}
      </tbody>
    </table>
  );
};

export default Table;