import './App.sass';
import { useState, useEffect } from 'react';
import { v4 as uuid } from 'uuid';
import Button from './Button/Button';
import Form from './Form/Form';
import Modal from './Modal/Modal';
import SwitchToggler from './SwitchToggler/SwitchToggler';
import Toast from './Toast/Toast'
import Table from './Table/Table';
import deleteIcon from '../assets/deleteIcon.svg';
import toastMessages from '../data/toastMessages';

const initialAddMemberData = {
  id: '',
  memberName: '',
  memberSurname: '',
  memberAge: '',
  memberCity: ''
};

const initialTableId = uuid();

const LOCAL_STORAGE_KEY = 'tableData';

function App() {

  const [members, setMembers] = useState([]);
  const [copiedTables, setCopiedTables] = useState([]);
  const [editableTableId, setEditableTableId] = useState(initialTableId);
  const [addMemberData, setAddMemberData] = useState(initialAddMemberData);
  const [isEditMember, setIsEditMember] = useState(false);
  const [changedMemberData, setChangedMemberData] = useState(initialAddMemberData);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [toastQueue, setToastQueue] = useState([]);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const loadDataFromLocalStorage = () => {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    return storedData ? JSON.parse(storedData) : null;
  };

  const saveDataToLocalStorage = (data) => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(data));
  };

  useEffect(() => {
    const loadedData = loadDataFromLocalStorage();
    if (loadedData) {
      setMembers(loadedData.members || []);
      setCopiedTables(loadedData.copiedTables || []);
    }
    setInitialLoad(false);
  }, []);

  useEffect(() => {
    if (!initialLoad) {
      saveDataToLocalStorage({
        members,
        copiedTables,
      });
    }
  }, [members, copiedTables, initialLoad]);

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
    handleShowToast('addMemberSuccess');
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
    handleShowToast('noChangesInfo');
  }

  const handleEditMemberSubmit = (e, tableId) => {
    e.preventDefault();

    const newMembers = [...members];
    const editedMemberId = changedMemberData.id;

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
    handleShowToast('savedChangesSuccess');
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
    handleShowToast('deleteDataSuccess');
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
    handleShowToast('copyTableSuccess');
  };

  const handleTableDelete = (tableId) => {
    const newCopiedTables = copiedTables.filter((table) => table.id !== tableId);
    if (tableId !== initialTableId) {
      setCopiedTables(newCopiedTables);
      handleShowToast('deleteTableSuccess');
    } else {
      handleShowToast('unableToDeleteTable');
    }
  }

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  const handleShowToast = (toastKey) => {
    const index = toastMessages.findIndex((toast) => toast.key === toastKey);
    const selectedToast = toastMessages[index];

    if (selectedToast) {
      setToastQueue([...toastQueue, selectedToast]);

      setTimeout(() => {
        setToastQueue((prevQueue) => prevQueue.filter((item) => item.key !== toastKey));
      }, 3000);
    }
  };

  useEffect(() => {
    if (toastQueue.length > 0) {
      const timer = setTimeout(() => {
        setToastQueue((prevQueue) => prevQueue.slice(1));
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toastQueue]);

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
          handleCloseModal={handleCloseModalForm}
          isControlledInput={true}
          buttonText='Add'
          isEditForm={false}
        />
        <Form
          addMemberData={addMemberData}
          handleAddMemberChange={handleAddMemberChange}
          handleAddMemberSubmit={handleAddMemberSubmit}
          handleCloseModal={handleCloseModalForm}
          isControlledInput={true}
          buttonText='Add'
          isEditForm={false}
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
          isEditForm={true}
        />
      }
      {toastQueue.map(({key, message, status}) => (
        <Toast
          key={key}
          toastText={message}
          toastStatus={status}
        />
      ))}
    </div>
  );
}

export default App;
