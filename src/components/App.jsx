import './App.sass';
import { useState } from 'react';
import { v4 as uuid } from 'uuid';
import Button from './Button/Button';
import Form from './Form/Form';
import Table from './Table/Table';
import Modal from './Modal/Modal';
import SwitchToggler from './SwitchToggler/SwitchToggler';
import deleteIcon from '../assets/deleteIcon.svg'

const initialAddMemberData = {
  id: '',
  memberName: '',
  memberSurname: '',
  memberAge: '',
  memberCity: ''
};

const initialTableId = uuid();

function App() {

  const [members, setMembers] = useState([]);
  const [copiedTables, setCopiedTables] = useState([]);
  const [editableTableId, setEditableTableId] = useState(initialTableId);
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

  const handleOpenModalForm = (memberId, tableId) => {
    if (tableId === initialTableId) {

      const index = members.findIndex((member) => member.id === memberId);
      const memberToEdit = members[index];
      setIsEditMember(true);
      setChangedMemberData(memberToEdit);
    } else {
      setEditableTableId(tableId);
      const copiedTable = copiedTables.find((table) => table.id === tableId);
      if (copiedTable) {
        const index = copiedTable.tableData.findIndex((member) => member.id === memberId);
        const memberToEdit = copiedTable.tableData[index];
        setIsEditMember(true);
        setChangedMemberData(memberToEdit);
      }
    }
    setModalIsOpen(true);
  }

  const handleCloseModalForm = () => {
    setModalIsOpen(false);
    setIsEditMember(false);
  }

  const handleEditMemberSubmit = (e, tableId) => {
    e.preventDefault();
    console.log(tableId);

    const newMembers = [...members];
    const editedMemberId = changedMemberData.id;
    console.log(editedMemberId);

    if (tableId === initialTableId) {
      const index = members.findIndex((member) => member.id === editedMemberId);

      newMembers[index] = {
        ...newMembers[index],
        memberName: changedMemberData.memberName,
        memberSurname: changedMemberData.memberSurname,
        memberAge: changedMemberData.memberAge,
        memberCity: changedMemberData.memberCity,
      };
      
    } else {
      const copiedTableIndex = copiedTables.findIndex((table) => table.id === tableId);
      
      const copiedTable = copiedTables[copiedTableIndex];
      const tableDataIndex = copiedTable.tableData.findIndex((member) => member.id === editedMemberId);
      console.log(tableDataIndex);
      if (tableDataIndex !== -1) {
        copiedTable.tableData[tableDataIndex] = {
          ...copiedTable.tableData[tableDataIndex],
          memberName: changedMemberData.memberName,
          memberSurname: changedMemberData.memberSurname,
          memberAge: changedMemberData.memberAge,
          memberCity: changedMemberData.memberCity,
        };
      }
    }

    setMembers(newMembers);
    handleResetModalForm();
    
  };

  const handleResetModalForm = () => {
    setModalIsOpen(false);
    setIsEditMember(false);
    setChangedMemberData(initialAddMemberData);
    setEditableTableId(initialTableId);
  }

  const handleDeletetMember = (memberId, tableId) => {

    if (tableId === initialTableId) {
      const newMembers = members.filter((member) => member.id !== memberId);
      setMembers(newMembers);
    }

    const updatedCopiedTables = copiedTables.map((table) => {
      if (table.id === tableId) {
        return {
          ...table,
          tableData: table.tableData.filter((member) => member.id !== memberId),
        };
      }
      return table;
    });
    setCopiedTables(updatedCopiedTables);
    
  }

  const handleTableCopy = (tableId) => {

    const newCopiedTableId = uuid();
    const copiedTableData = copiedTables.find((table) => table.id === tableId);

    if (tableId === initialTableId) {
      const newCopiedTable = [...members];
      const newCopiedTableData = {
        id: newCopiedTableId,
        tableData: newCopiedTable
      };
      setCopiedTables([...copiedTables, newCopiedTableData]);
    } else if (copiedTableData) {
      const newCopiedTable = [...copiedTableData.tableData];
      const newCopiedTableData = {
        id: newCopiedTableId,
        tableData: newCopiedTable
      };
      setCopiedTables([...copiedTables, newCopiedTableData]);
    }
  };

  const handleTableDelete = (tableId) => {
    const newCopiedTables = copiedTables.filter((table) => table.id !== tableId);
    if (tableId !== initialTableId) {
      setCopiedTables(newCopiedTables);
    } else {
      console.log('Can not delete initial table');
    }
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
          tableId={initialTableId}
        />
        <Form
          addMemberData={addMemberData}
          handleAddMemberChange={handleAddMemberChange}
          handleAddMemberSubmit={handleAddMemberSubmit}
          isControlledInput={true}
          buttonText='Add'
          tableId={initialTableId}
        />
      </div>
      <div className='App__btns-wrapper'>
        <Button
          buttonType='button'
          buttonClass='btn btn--table-copy'
          buttonText='Copy table'
          buttonDisabled={false}
          onClick={() => handleTableCopy(initialTableId)}
          testId='btn-copy'
        />
        <Button
          buttonType='button'
          buttonClass='btn btn--small btn--delete'
          buttonText={<img src={deleteIcon} alt="Delete Icon" />}
          buttonDisabled={false}
          onClick={() => handleTableDelete(initialTableId)}
          testId='btn-copy'
        />
      </div>
      <Table
        members={members}
        handleEditMember={handleOpenModalForm}
        handleDeletetMember={handleDeletetMember}
        tableId={initialTableId}
      />
      {copiedTables.length > 0 && (
        <div className='App__tables-wrapper'>
          {copiedTables.map(({id, tableData}) => (
            <div className='App__table-wrapper' key={id}>
              <div className='App__btns-wrapper'>
                <Button
                  buttonType='button'
                  buttonClass='btn btn--table-copy'
                  buttonText='Copy table'
                  buttonDisabled={false}
                  onClick={() => handleTableCopy(id)}
                  testId='btn-copy'
                />
                <Button
                  buttonType='button'
                  buttonClass='btn btn--small btn--delete'
                  buttonText={<img src={deleteIcon} alt="Delete Icon" />}
                  buttonDisabled={false}
                  onClick={() => handleTableDelete(id)}
                  testId='btn-copy'
                />
              </div>
              <Table
                members={tableData}
                handleEditMember={handleOpenModalForm}
                handleDeletetMember={handleDeletetMember}
                tableId={id}
              />
            </div>
          ))}
        </div>
      )}
      {modalIsOpen &&
        <Modal
          existingMemberData={changedMemberData}
          handleAddMemberChange={handleAddMemberChange}
          handleEditMemberSubmit={handleEditMemberSubmit}
          handleCloseModal={handleCloseModalForm}
          tableId={editableTableId}
        />
      }
    </div>
  );
}

export default App;
