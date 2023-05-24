import React from "react";
import { Button, Modal } from "react-daisyui";

const DltModal = ({ handleDlt, title, name, visible, setVisible }) => {
  return (
    <Modal open={visible} onClickBackdrop={() => setVisible(!visible)}>
      <Modal.Header className="font-bold">Delete {title}</Modal.Header>

      <Modal.Body>Are you confirm to delete {name} ?</Modal.Body>

      <Modal.Actions>
        <Button
          type="button"
          className="bg-slate-400 border-none"
          onClick={() => setVisible(!visible)}
        >
          Close
        </Button>
        <Button className="bg-rose-500 border-none" onClick={handleDlt}>
          Confirm
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default DltModal;
