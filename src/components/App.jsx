import './App.sass';
import { useState, useEffect } from 'react';
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
  const [formisValid, setFormIsValid] = useState(false);
  const [addMemberData, setAddMemberData] = useState(initialAddMemberData);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    const validateForm = () => {
      const result = !!addMemberData.memberName && !!addMemberData.memberSurname && !!addMemberData.memberAge && !!addMemberData.memberCity;
      return result;
    };

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
    setAddMemberData(initialAddMemberData);
  };

  const handleEditMember = (memberId) => {
    setModalIsOpen(true);
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
        formisValid={formisValid}
        handleAddMemberSubmit={handleAddMemberSubmit}
      />
      <Table
        members={members}
        handleEditMember={handleEditMember}
        handleDeletetMember={handleDeletetMember}
      />
      {modalIsOpen &&
        <Modal
          addMemberData={addMemberData}
          handleAddMemberChange={handleAddMemberChange}
          formisValid={formisValid}
          handleAddMemberSubmit={handleAddMemberSubmit}
          handleCloseModal={() => setModalIsOpen(false)}
        />
      }
    </div>
  );
}

export default App;
