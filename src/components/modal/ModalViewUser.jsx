/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Modal from "react-bootstrap/Modal";
import Label from "../label/Label";
import Input from "../input/Input";
import Dropdown from "../dropdown/Dropdown";
import Button from "react-bootstrap/Button";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../../styles/Modal.scss";
import _ from "lodash";
import InputUploadImage from "../input/InputUploadImage";

const ModalViewUser = ({ show, dataView, label, setShow = () => {} }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const { control, reset } = useForm({
    mode: "onChange",
  });
  const handleClose = () => {
    setShow(false);
  };
  useEffect(() => {
    if (!_.isEmpty(dataView)) {
      reset({
        email: dataView.email,
        username: dataView.username,
      });
      if (dataView.image)
        setPreviewImage(`data:image/jpeg;base64,${dataView.image}`);
      else setPreviewImage(null);
    }
  }, [dataView]);
  return (
    <>
      <Modal size="xl" backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Information user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="modal-group">
              <div className="modal-group-content">
                <div className="form-group">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    readOnly
                    control={control}
                    placeholder="Please enter your email"
                  />
                </div>
                <div className="form-group">
                  <Label htmlFor="username">Username</Label>
                  <Input
                    type="text"
                    name="username"
                    id="username"
                    readOnly
                    control={control}
                    placeholder="Please enter your username"
                  />
                </div>
              </div>
              <div className="modal-group-content">
                <div className="form-group">
                  <Label>Role</Label>
                  <Dropdown
                    name="role"
                    control={control}
                    dropdownLabel={label}
                  />
                </div>
              </div>
            </div>
            <InputUploadImage previewImage={previewImage} />
            <div className="modal-group-button">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalViewUser;
