/* eslint-disable react/prop-types */
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import Profile from "../../modules/infor/Profile";
import History from "../../modules/infor/History";
import ChangePassword from "../../modules/infor/ChangePassword";

// eslint-disable-next-line no-unused-vars
const ModalInfor = ({ show, setShow = () => {} }) => {
  const [key, setKey] = useState("profile");
  const handleClose = () => setShow(false);
  return (
    <Modal size="xl" show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Informations</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="profile" title="User Information">
            <Profile handleClose={handleClose} />
          </Tab>
          <Tab eventKey="change-password" title="Change Password">
            <ChangePassword handleClose={handleClose} />
          </Tab>
          <Tab eventKey="history" title="History">
            <History />
          </Tab>
        </Tabs>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalInfor;
