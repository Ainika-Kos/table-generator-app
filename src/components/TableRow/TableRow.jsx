import Button from "../Button/Button";

const TableRow = ({ member, editHandle, deleteHandle }) => {
  return (
    <tr>
      <td>{member.memberName}</td>
      <td>{member.memberSurname}</td>
      <td className='narrow'>{member.memberAge}</td>
      <td>{member.memberCity}</td>
      <td className='wide'>
        <Button
          buttonType='button'
          buttonClass='btn btn--small btn--edit'
          buttonText='Edit'
          buttonDisabled={false}
          onClick={editHandle}
        />
        <Button
          buttonType='button'
          buttonClass='btn btn--small btn--delete'
          buttonText='Delete'
          buttonDisabled={false}
          onClick={deleteHandle}
        />
      </td>
    </tr>
  );
};

export default TableRow;