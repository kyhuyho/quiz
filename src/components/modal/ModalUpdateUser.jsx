/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Modal from "react-bootstrap/Modal";
import Label from "../label/Label";
import Input from "../input/Input";
import Dropdown from "../dropdown/Dropdown";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { putUpdateUser } from "../../services/userServices";
import "../../styles/Modal.scss";
import _ from "lodash";
import InputUploadImage from "../input/InputUploadImage";

const dataRole = [
  { id: 1, value: "ADMIN", text: "ADMIN" },
  { id: 2, value: "USER", text: "USER" },
];
const schema = yup
  .object({
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter your email address"),
    username: yup.string().required("Please enter your username"),
    role: yup
      .string()
      .required("Please select your role")
      .oneOf(["ADMIN", "USER"]),
  })
  .required();
const ModalUpdateUser = ({
  show,
  dataUpdate,
  currentPage,
  label,
  setShow = () => {},
  fetchListUsers = () => {},
}) => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const {
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleClose = () => {
    setShow(false);
  };
  const handleChangeFileImage = (event) => {
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setImage(event.target.files[0]);
  };
  const handleUpdateUser = async (values) => {
    const res = await putUpdateUser(
      dataUpdate.id,
      values.username,
      values.role,
      image
    );
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      fetchListUsers(currentPage);
      reset({
        email: "",
        username: "",
      });
      setImage(null);
      setPreviewImage(null);
    } else toast.error(res.EM);
  };
  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      reset({
        email: dataUpdate.email,
        username: dataUpdate.username,
      });
      if (dataUpdate.image)
        setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`);
      else setPreviewImage(null);
    }
  }, [dataUpdate]);
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) toast.error(arrErrors[0]?.message);
  }, [errors]);
  return (
    <>
      <Modal size="xl" backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleUpdateUser)}>
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
                    setValue={setValue}
                    dataDropdown={dataRole}
                    dropdownLabel={label}
                  />
                </div>
              </div>
            </div>
            <InputUploadImage
              previewImage={previewImage}
              idImage="userCreateImage"
              handleChangeFileImage={handleChangeFileImage}
            />
            <div className="modal-group-button">
              <Button variant="secondary" onClick={handleClose}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalUpdateUser;
