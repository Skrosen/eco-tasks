import { Btn } from "./Buttons";
import { useState, useEffect } from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: "2",
  },
};

// Make sure to bind modal to your appElement (https://reactcommunity.org/react-modal/accessibility/)
Modal.setAppElement("#root");

const PopUp = (props) => {
  const { setShowPopUp, header, text, open } = props;
  const [modalIsOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const closeModal = () => {
    setIsOpen(false);
    setShowPopUp(false);
  };

  return (
    <div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2>{header}</h2>
        <div>{text}</div>
        <Btn onClick={closeModal}>close</Btn>
      </Modal>
    </div>
  );
};

export default PopUp;
