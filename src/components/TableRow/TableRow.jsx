const TableRow = ({ member }) => {
  return (
    <tr>
      <td>{member.memberName}</td>
      <td>{member.memberSurname}</td>
      <td>{member.memberAge}</td>
      <td>{member.memberCity}</td>
    </tr>
  );
};

export default TableRow;