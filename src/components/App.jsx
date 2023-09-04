import './App.sass';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Form from './Form/Form';
import Table from './Table/Table';
import Modal from './Modal/Modal';

const initialAddMemberData = {
  id: '',
  memberName: '',
  memberSurname: '',
  memberAge: '',
  memberCity: ''
};

function App() {

  const [members, setMembers] = useState([]);
  const [addMemberData, setAddMemberData] = useState(initialAddMemberData);
  const [existingMemberData, setExistingMemberData] = useState(initialAddMemberData);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
    setAddMemberData(initialAddMemberData);
  };

  const handleEditMember = (memberId) => {
    setModalIsOpen(true);
    const index = members.findIndex((member) => member.id === memberId);
    const existingMember = members[index];

    const existingMemberData = {
      id: memberId,
      memberName: existingMember.memberName,
      memberSurname: existingMember.memberSurname,
      memberAge: existingMember.memberAge,
      memberCity: existingMember.memberCity
    };

    setExistingMemberData(existingMemberData);
  }

  const handleDeletetMember = (memberId) => {
    const newMembers = [...members];
    const index = members.findIndex((member) => member.id === memberId);
    newMembers.splice(index, 1);
    setMembers(newMembers);
  }

  return (
    <div className='App'>
      <Form
        addMemberData={addMemberData}
        handleAddMemberChange={handleAddMemberChange}
        handleAddMemberSubmit={handleAddMemberSubmit}
      />
      <Table
        members={members}
        handleEditMember={handleEditMember}
        handleDeletetMember={handleDeletetMember}
      />
      {modalIsOpen &&
        <Modal
          existingMemberData={existingMemberData}
          handleAddMemberChange={handleAddMemberChange}
          handleAddMemberSubmit={handleAddMemberSubmit}
          handleCloseModal={() => setModalIsOpen(false)}
        />
      }
    </div>
  );
}

export default App;
