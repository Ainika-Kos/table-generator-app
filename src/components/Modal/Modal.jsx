import './Modal.sass';
import Form from '../Form/Form';
const Modal = ({ existingMemberData, handleAddMemberChange, handleEditMemberSubmit, handleCloseModal }) => {

  return (
    <div
      className='App__modal-container'
      onClick={(e) => { if (e.target.className === 'App__modal-container') handleCloseModal()}}
    >
      <Form
        addMemberData={existingMemberData}
        handleAddMemberChange={handleAddMemberChange}
        handleAddMemberSubmit={handleEditMemberSubmit}
        isControlledInput={false}
        buttonText='Save'
      />
    </div>
  );
};

export default Modal;