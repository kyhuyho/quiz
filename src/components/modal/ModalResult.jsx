/* eslint-disable react/prop-types */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalResult = ({
  show,
  dataResult,
  setShow = () => {},
  handleShowAnswer = () => {},
}) => {
  const handleClose = () => setShow(false);
  return (
    <>
      <Modal size="md" backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Result</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Total questions: {dataResult?.countTotal}</p>
          <p>Total correct answers: {dataResult?.countCorrect}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={() => {
              handleClose();
              handleShowAnswer();
            }}
          >
            Show answers
          </Button>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalResult;
