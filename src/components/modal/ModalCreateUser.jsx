/* eslint-disable react/prop-types */
import Modal from "react-bootstrap/Modal";
import Label from "../label/Label";
import InputUploadImage from "../input/InputUploadImage";
import InputPasswordToggle from "../input/InputPasswordToggle";
import Input from "../input/Input";
import Dropdown from "../dropdown/Dropdown";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { postCreateNewUser } from "../../services/userServices";
import "../../styles/Modal.scss";

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
    password: yup
      .string()
      .min(8, "Your password must be at least 6 characters or greater")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Your password must have at least 1 uppercase, 1 lowercase, 1 special character",
        }
      )
      .required("Please enter your password"),
    role: yup
      .string()
      .required("Please select your role")
      .oneOf(["ADMIN", "USER"]),
  })
  .required();
const ModalCreateUser = ({
  show,
  setShow = () => {},
  fetchListUsers = () => {},
  setCurrentPage = () => {},
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
  const handleCreateNewUser = async (values) => {
    const res = await postCreateNewUser(
      values.email,
      values.password,
      values.username,
      values.role,
      image
    );
    if (res && res.EC === 0) {
      toast.success(res.EM);
      // handleClose();
      setCurrentPage(1);
      fetchListUsers(1);
      reset({
        email: "",
        username: "",
        password: "",
      });
      setImage(null);
      setPreviewImage(null);
    } else toast.error(res.EM);
  };
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) toast.error(arrErrors[0]?.message);
  }, [errors]);
  return (
    <>
      <Modal size="xl" backdrop="static" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new user</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleCreateNewUser)}>
            <div className="modal-group">
              <div className="modal-group-content">
                <div className="form-group">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    type="email"
                    name="email"
                    id="email"
                    control={control}
                    placeholder="Please enter your email"
                  />
                </div>
                <div className="form-group">
                  <Label htmlFor="password">Password</Label>
                  <InputPasswordToggle
                    name="password"
                    id="password"
                    control={control}
                  />
                </div>
              </div>
              <div className="modal-group-content">
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
                <div className="form-group">
                  <Label>Role</Label>
                  <Dropdown
                    name="role"
                    control={control}
                    setValue={setValue}
                    dataDropdown={dataRole}
                    dropdownLabel="Please select your role"
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

export default ModalCreateUser;
