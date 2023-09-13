/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import Modal from "react-bootstrap/Modal";
import Label from "../label/Label";
import InputUploadImage from "../input/InputUploadImage";
import Input from "../input/Input";
import Dropdown from "../dropdown/Dropdown";
import Button from "react-bootstrap/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import "../../styles/Modal.scss";
import _ from "lodash";
import { putUpdateQuiz } from "../../services/quizServices";
import { toast } from "react-toastify";

const dataDifficulty = [
  { id: 1, value: "EASY", text: "EASY" },
  { id: 2, value: "MEDIUM", text: "MEDIUM" },
  { id: 3, value: "HARD", text: "HARD" },
];

const schema = yup
  .object({
    name: yup.string().required("Please enter name of Quiz"),
    description: yup.string().required("Please enter description of Quiz"),
    difficulty: yup
      .string()
      .required("Please select difficulty of Quiz")
      .oneOf(["EASY", "MEDIUM", "HARD"]),
  })
  .required();

const ModalUpdateQuiz = ({
  show,
  dataUpdate,
  label,
  setShow = () => {},
  fetchListQuiz = () => {},
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
  const handleUpdateQuiz = async (values) => {
    const res = await putUpdateQuiz(
      dataUpdate.id,
      values.description,
      values.name,
      values.difficulty,
      image
    );
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
      fetchListQuiz();
      reset({
        description: "",
        name: "",
      });
      setImage(null);
      setPreviewImage(null);
    } else toast.error(res.EM);
  };
  useEffect(() => {
    if (!_.isEmpty(dataUpdate)) {
      reset({
        description: dataUpdate.description,
        name: dataUpdate.name,
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
          <Modal.Title>Update Quiz</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(handleUpdateQuiz)}>
            <div className="modal-group">
              <div className="modal-group-content">
                <div className="form-group">
                  <Label htmlFor="description">Description</Label>
                  <Input
                    type="text"
                    name="description"
                    id="description"
                    control={control}
                    placeholder="Please enter your email"
                  />
                </div>
                <div className="form-group">
                  <Label htmlFor="username">Name</Label>
                  <Input
                    type="text"
                    name="name"
                    id="name"
                    control={control}
                    placeholder="Please enter your username"
                  />
                </div>
              </div>
              <div className="modal-group-content">
                <div className="form-group">
                  <Label>Difficulty</Label>
                  <Dropdown
                    name="difficulty"
                    control={control}
                    setValue={setValue}
                    dataDropdown={dataDifficulty}
                    dropdownLabel={label}
                  />
                </div>
              </div>
            </div>
            <InputUploadImage
              previewImage={previewImage}
              idImage="quizUpdateImage"
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

export default ModalUpdateQuiz;
