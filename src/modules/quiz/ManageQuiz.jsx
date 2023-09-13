import Table from "../../components/table/Table";
import Swal from "sweetalert2";
import ModalUpdateQuiz from "../../components/modal/ModalUpdateQuiz";
import Label from "../../components/label/Label";
import InputUploadImage from "../../components/input/InputUploadImage";
import Input from "../../components/input/Input";
import Edit from "../../components/action/Edit";
import Dropdown from "../../components/dropdown/Dropdown";
import Delete from "../../components/action/Delete";
import Button from "../../components/button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
  deleteQuiz,
  getAllQuiz,
  postCreateNewQuiz,
} from "../../services/quizServices";
import "../../styles/ManageQuiz.scss";

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

const ManageQuiz = () => {
  const [listQuiz, setListQuiz] = useState([]);
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isShowModalUpdateQuiz, setIsShowModalUpdateQuiz] = useState(false);
  const [dropdownLabel, setDropdownLabel] = useState(
    "Please select difficulty of Quiz"
  );
  const [dataUpdate, setDataUpdate] = useState(null);
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
  const handleChangeFileImage = (event) => {
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setImage(event.target.files[0]);
  };
  const handleAddNewQuiz = async (values) => {
    const res = await postCreateNewQuiz(
      values.description,
      values.name,
      values.difficulty,
      image
    );
    if (res && res.EC === 0) {
      toast.success(res.EM);
      fetchListQuiz();
      reset({
        description: "",
        name: "",
      });
      setImage(null);
      setPreviewImage(null);
    } else toast.error(res.EM);
  };
  const handleBtnEdit = (quiz, difficulty) => {
    setIsShowModalUpdateQuiz(true);
    setDataUpdate(quiz);
    setDropdownLabel(difficulty);
  };
  const handleBtnDelete = (quiz) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to delete the Quiz article called: ${quiz?.name}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const res = await deleteQuiz(quiz?.id);
        if (res && res.EC === 0) {
          fetchListQuiz();
          Swal.fire("Deleted!", "Quiz has been deleted.", "success");
        }
      }
    });
  };
  const fetchListQuiz = async () => {
    const res = await getAllQuiz();
    if (res && res.EC === 0) setListQuiz(res.DT);
  };
  useEffect(() => {
    fetchListQuiz();
  }, []);
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) toast.error(arrErrors[0]?.message);
  }, [errors]);
  return (
    <>
      <form onSubmit={handleSubmit(handleAddNewQuiz)}>
        <fieldset className="border rounded-3 p-3">
          <legend className="float-none w-auto px-3">Add new Quiz:</legend>
          <div className="d-flex flex-column gap-3 mb-3">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              name="name"
              id="name"
              control={control}
              placeholder="Please enter quiz of name"
            />
          </div>
          <div className="d-flex flex-column gap-3 mb-3">
            <Label htmlFor="description">Description</Label>
            <Input
              type="text"
              name="description"
              id="description"
              control={control}
              placeholder="Please enter quiz of description"
            />
          </div>
          <div className="d-flex flex-column gap-3 mb-3">
            <Label>Difficulty</Label>
            <Dropdown
              name="difficulty"
              control={control}
              setValue={setValue}
              dataDropdown={dataDifficulty}
              dropdownLabel="Please select difficulty"
            />
          </div>
          <div>
            <InputUploadImage
              previewImage={previewImage}
              idImage="quizImage"
              handleChangeFileImage={handleChangeFileImage}
            />
          </div>
          <div className="d-flex justify-content-center mt-3">
            <Button bgc="blue" noBorder={true}>
              Save
            </Button>
          </div>
        </fieldset>
      </form>
      <div className="list-quiz">
        <h1>List Quizzes</h1>
        <Table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {listQuiz &&
              listQuiz.length > 0 &&
              listQuiz.map((quiz) => (
                <tr key={quiz?.id}>
                  <th>{quiz?.id}</th>
                  <td>{quiz?.name}</td>
                  <td>{quiz?.description}</td>
                  <td>{quiz?.difficulty}</td>
                  <td>
                    <div className="d-flex gap-3">
                      <Edit
                        onClick={() => handleBtnEdit(quiz, quiz?.difficulty)}
                      />
                      <Delete onClick={() => handleBtnDelete(quiz)} />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <ModalUpdateQuiz
        show={isShowModalUpdateQuiz}
        dataUpdate={dataUpdate}
        setShow={setIsShowModalUpdateQuiz}
        label={dropdownLabel}
        fetchListQuiz={fetchListQuiz}
      />
    </>
  );
};

export default ManageQuiz;
