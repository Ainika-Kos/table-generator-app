import './App.sass';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Button from './Button/Button';
import Form from './Form/Form';
import Table from './Table/Table';
import Modal from './Modal/Modal';
import SwitchToggler from './SwitchToggler/SwitchToggler';

const initialAddMemberData = {
  id: '',
  memberName: '',
  memberSurname: '',
  memberAge: '',
  memberCity: ''
};

function App() {

  const [members, setMembers] = useState([]);
  const [copiedTables, setCopiedTables] = useState([]);
  const [addMemberData, setAddMemberData] = useState(initialAddMemberData);
  const [isEditMember, setIsEditMember] = useState(false);
  const [changedMemberData, setChangedMemberData] = useState(initialAddMemberData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);

  const handleAddMemberChange = (e) => {
    e.preventDefault();

    const { name, value } = e.target;

    if (isEditMember) {
      setChangedMemberData({ ...changedMemberData, [name]: value })
    } else {
      setAddMemberData({ ...addMemberData, [name]: value })
    }

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

  const handleOpenModalForm = (memberId) => {
    setModalIsOpen(true);
    const index = members.findIndex((member) => member.id === memberId);
    const memberToEdit = members[index];
    setIsEditMember(true);
    setChangedMemberData(memberToEdit);
  }

  const handleCloseModalForm = () => {
    setModalIsOpen(false);
    setIsEditMember(false);
  }

  const handleEditMemberSubmit = (e) => {
    e.preventDefault();

    const newMembers = [...members];

    const editedMemberId = changedMemberData.id;
    const index = members.findIndex((member) => member.id === editedMemberId);

    if (index !== -1) {
      
      newMembers[index] = {
        ...newMembers[index],
        memberName: changedMemberData.memberName,
        memberSurname: changedMemberData.memberSurname,
        memberAge: changedMemberData.memberAge,
        memberCity: changedMemberData.memberCity,
      };

      setMembers(newMembers);
      handleResetModalForm();
    }
  };

  const handleResetModalForm = () => {
    setModalIsOpen(false);
    setIsEditMember(false);
    setChangedMemberData(initialAddMemberData);
  }

  const handleDeletetMember = (memberId) => {
    const newMembers = [...members];
    const index = members.findIndex((member) => member.id === memberId);
    newMembers.splice(index, 1);
    setMembers(newMembers);
  }

  const handleTableCopy = () => {
    const newCopiedTable = [...members];
    setCopiedTables([...copiedTables, newCopiedTable]);
  }

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className={`App ${isDarkTheme ? 'dark-theme' : ''}`} data-testid='app'>
      <SwitchToggler
        isDarkTheme={isDarkTheme}
        onChange={toggleTheme}
      />
      <div className='App__forms-wrapper'>
        <Form
          addMemberData={addMemberData} 
          handleAddMemberChange={handleAddMemberChange}
          handleAddMemberSubmit={handleAddMemberSubmit}
          isControlledInput={true}
          buttonText='Add'
        />
        <Form
          addMemberData={addMemberData}
          handleAddMemberChange={handleAddMemberChange}
          handleAddMemberSubmit={handleAddMemberSubmit}
          isControlledInput={true}
          buttonText='Add'
        />
      </div>
      <Button
        buttonType='button'
        buttonClass='btn'
        buttonText='Copy'
        buttonDisabled={false}
        onClick={handleTableCopy}
        testId='btn-copy'
      />
      <Table
        members={members}
        handleEditMember={handleOpenModalForm}
        handleDeletetMember={handleDeletetMember}
      />
      {copiedTables.length > 0 && (
        <div className='App__tables-wrapper'>
          {copiedTables.map((copiedTableData) => (
            <Table
              key={copiedTableData.id}
              members={copiedTableData}
              handleEditMember={handleOpenModalForm}
              handleDeletetMember={handleDeletetMember}
            />
          ))}
        </div>
      )}
      {modalIsOpen &&
        <Modal
          existingMemberData={changedMemberData}
          handleAddMemberChange={handleAddMemberChange}
          handleEditMemberSubmit={handleEditMemberSubmit}
          handleCloseModal={handleCloseModalForm}
        />
      }
    </div>
  );
}

export default App;
