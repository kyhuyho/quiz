/* eslint-disable react-hooks/exhaustive-deps */
import Question from "../modules/question/Question";
import ModalResult from "../components/modal/ModalResult";
import Button from "../components/button/Button";
import { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { postSubmitAnswer } from "../services/answerServices";
import { getQuestionByQuizId } from "../services/questionServices";
import "../styles/DetailQuizPage.scss";
import _ from "lodash";
import RightContent from "../modules/question/RightContent";
import { toast } from "react-toastify";

const DetailQuizPage = () => {
  const location = useLocation();
  const { quizId } = useParams();
  const [dataQuiz, setDataQuiz] = useState(null);
  const [index, setIndex] = useState(0);
  const [isShowModalResult, setIsShowModalResult] = useState(false);
  const [isSubmitQuiz, setIsSubmitQuiz] = useState(false);
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  const [dataResult, setDataResult] = useState(null);
  const fetchQuizById = async () => {
    const res = await getQuestionByQuizId(quizId);
    const data = _.chain(res.DT)
      // Group the elements of Array based on `id` property
      .groupBy("id")
      // `key` is group's name (id), `value` is the array of objects
      .map((value, key) => {
        let answers = [];
        let description = null;
        let image = null;
        value.forEach((item, index) => {
          if (index === 0) {
            (description = item.description), (image = item.image);
          }
          item.answers.isCorrect = false;
          item.answers.isSelected = false;
          answers.push(item.answers);
        });
        answers = _.orderBy(answers, ["id"], ["asc"]);
        return { questionId: +key, answers, description, image };
      })
      .value();
    setDataQuiz(data);
  };
  const handleCheckBox = (questionId, answerId) => {
    const dataQuizClone = _.cloneDeep(dataQuiz);
    const index = dataQuizClone.findIndex(
      (item) => item.questionId === questionId
    );
    if (index > -1) {
      dataQuizClone[index].answers = dataQuizClone[index].answers.map(
        (item) => {
          if (item.id === answerId) {
            item.isSelected = !item.isSelected;
          }
          return item;
        }
      );
      setDataQuiz(dataQuizClone);
    }
  };
  const handleFinish = async () => {
    const payload = {
      quizId: quizId,
      answers: [],
    };
    const answers = [];
    if (dataQuiz && dataQuiz.length > 0) {
      dataQuiz.forEach((item) => {
        const questionId = item.questionId;
        const userAnswerId = [];

        // todo
        item.answers.forEach((item) => {
          if (item.isSelected) {
            userAnswerId.push(item.id);
          }
        });
        answers.push({
          questionId: questionId,
          userAnswerId: userAnswerId,
        });
      });
    }
    payload.answers = [...answers];

    //submit API
    const res = await postSubmitAnswer(payload);
    if (res && res.EC === 0) {
      setDataResult(res.DT);
      setIsSubmitQuiz(true);
      setIsShowModalResult(true);

      //update DataQuiz with correct answer
      if (res.DT && res.DT.quizData) {
        let dataQuizClone = _.cloneDeep(dataQuiz);
        let a = res.DT.quizData;
        for (let q of a) {
          for (let i = 0; i < dataQuizClone.length; i++) {
            if (+q.questionId === +dataQuizClone[i].questionId) {
              //update answer
              let newAnswers = [];
              for (let j = 0; j < dataQuizClone[i].answers.length; j++) {
                let s = q.systemAnswers.find(
                  (item) => +item.id === +dataQuizClone[i].answers[j].id
                );
                if (s) {
                  dataQuizClone[i].answers[j].isCorrect = true;
                }
                newAnswers.push(dataQuizClone[i].answers[j]);
              }
              dataQuizClone[i].answers = newAnswers;
            }
          }
        }
        setDataQuiz(dataQuizClone);
      }
    } else toast.error("Somthing wrongs...");
  };
  const handleBtnNext = () => {
    if (dataQuiz && dataQuiz.length - 1 > index) setIndex(index + 1);
  };
  const handleBtnPrev = () => {
    if (index <= 0) return null;
    setIndex(index - 1);
  };
  const handleShowAnswer = () => {
    if (!isSubmitQuiz) return;
    setIsShowAnswer(true);
  };
  useEffect(() => {
    fetchQuizById();
  }, [quizId]);
  return (
    <div className="container-layout detail-quiz">
      <div className="detail-quiz-left p-4">
        <Question
          dataQuiz={dataQuiz && dataQuiz[index]}
          index={index}
          quizId={quizId}
          description={location?.state?.description}
          handleCheckBox={handleCheckBox}
          isShowAnswer={isShowAnswer}
          isSubmitQuiz={isSubmitQuiz}
        />
        <div className="detail-quiz-button">
          <Button bgc="blue" noBorder={true} onClick={handleBtnPrev}>
            Prev
          </Button>
          <Button bgc="dark" noBorder={true} onClick={handleBtnNext}>
            Next
          </Button>
          <Button
            bgc="yellow"
            noBorder={true}
            onClick={handleFinish}
            disabled={isSubmitQuiz}
          >
            Finish
          </Button>
        </div>
      </div>
      <div className="detail-quiz-right">
        <RightContent
          handleFinish={handleFinish}
          dataQuiz={dataQuiz}
          setIndex={setIndex}
        />
      </div>
      <ModalResult
        show={isShowModalResult}
        setShow={setIsShowModalResult}
        dataResult={dataResult}
        handleShowAnswer={handleShowAnswer}
      />
    </div>
  );
};

export default DetailQuizPage;
