import Select from "react-select";
import Button from "../../components/button/Button";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getAllUser } from "../../services/userServices";
import { getAllQuiz, postAssignQuizForUser } from "../../services/quizServices";
import "../../styles/AssignQuiz.scss";

const AssignQuiz = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [listUsers, setListUsers] = useState([]);
  const [listQuiz, setListQuiz] = useState([]);
  const fetchListUsers = async () => {
    const res = await getAllUser();
    if (res && res.EC === 0) {
      const newListUsers = res.DT?.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.username} - ${item.email}`,
        };
      });
      setListUsers(newListUsers);
    }
  };
  const fetchListQuiz = async () => {
    const res = await getAllQuiz();
    if (res && res.EC === 0) {
      const newListQuiz = res.DT?.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.name} - ${item.description}`,
        };
      });
      setListQuiz(newListQuiz);
    }
  };
  const handleAssignQuizForUser = async () => {
    const res = await postAssignQuizForUser(
      selectedQuiz.value,
      selectedUser.value
    );
    if (res && res.EC === 0) toast.success(res.EM);
    else toast.error(res.EM);
  };
  useEffect(() => {
    fetchListQuiz();
    fetchListUsers();
  }, []);
  return (
    <>
      <div className="assign-quiz-container">
        <div className="assign-quiz-left">
          <span>List Users</span>
          <Select
            defaultValue={selectedUser}
            onChange={setSelectedUser}
            options={listUsers}
          />
        </div>
        <div className="assign-quiz-right">
          <span>List Quizzes</span>
          <Select
            defaultValue={setListQuiz}
            onChange={setSelectedQuiz}
            options={listQuiz}
          />
        </div>
      </div>
      <div className="mt-3 text-center">
        <Button
          bgc="yellow"
          noBorder={true}
          onClick={() => handleAssignQuizForUser()}
        >
          Save
        </Button>
      </div>
    </>
  );
};

export default AssignQuiz;
