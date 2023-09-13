import Card from "../components/card/Card";
import { useState, useEffect } from "react";
import { getAllQuizByUser } from "../services/quizServices";
import "../styles/ListQuizPage.scss";

const ListQuizPage = () => {
  const [listQuiz, setListQuiz] = useState([]);
  const fetchAllQuizByUser = async () => {
    const res = await getAllQuizByUser();
    if (res && res.EC === 0) setListQuiz(res?.DT);
  };
  useEffect(() => {
    fetchAllQuizByUser();
  }, []);
  return (
    <div className="container-layout list-quiz-container">
      {listQuiz &&
        listQuiz.length > 0 &&
        listQuiz.map((quiz) => <Card key={quiz.id} data={quiz} />)}
    </div>
  );
};

export default ListQuizPage;
