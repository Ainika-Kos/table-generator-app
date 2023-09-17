import './Modal.sass';
import Form from '../Form/Form';

const Modal = ({ existingMemberData, handleAddMemberChange, handleEditMemberSubmit, handleCloseModal, tableId, isEditForm }) => {

  return (
    <div
      className='App__modal-container'
      onClick={(e) => { if (e.target.className === 'App__modal-container') handleCloseModal()}}
      data-testid='modal-form'
    >
      <Form
        addMemberData={existingMemberData}
        handleAddMemberChange={handleAddMemberChange}
        handleAddMemberSubmit={(e) => handleEditMemberSubmit(e, tableId)}
        handleCloseModal={handleCloseModal}
        isControlledInput={false}
        buttonText='Agree'
        isEditForm={isEditForm}
      />
    </div>
  );
};

export default Modal;