import './Modal.sass';
import Form from '../Form/Form';

const Modal = ({ addMemberData, handleAddMemberChange, formisValid, handleAddMemberSubmit, handleCloseModal }) => {
  return (
    <div
      className='App__modal-container'
      onClick={(e) => { if (e.target.className === 'App__modal-container') handleCloseModal()}}
    >
      <Form
        addMemberData={addMemberData}
        handleAddMemberChange={handleAddMemberChange}
        formisValid={formisValid}
        handleAddMemberSubmit={handleAddMemberSubmit}
      />
    </div>
  );
};

export default Modal;