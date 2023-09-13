import Select from "react-select";
import Label from "../../components/label/Label";
import Button from "../../components/button/Button";
import { v4 as uuidv4 } from "uuid";
import { useState, useEffect } from "react";
import { RiImageAddLine } from "react-icons/ri";
import { AiFillMinusCircle } from "react-icons/ai";
import {
  BsPlusCircleFill,
  BsPatchMinusFill,
  BsPatchPlusFill,
} from "react-icons/bs";
import "../../styles/ManageQuestion.scss";
import _ from "lodash";
import { getAllQuiz } from "../../services/quizServices";
import Lightbox from "react-awesome-lightbox";
import { postCreateNewQuestion } from "../../services/questionServices";
import { postCreateNewAnswer } from "../../services/answerServices";
import { toast } from "react-toastify";
uuidv4();

const ManageQuestion = () => {
  const initQuestions = [
    {
      id: uuidv4(),
      description: "",
      imageFile: "",
      imageName: "",
      answers: [
        {
          id: uuidv4(),
          description: "",
          isCorrect: false,
        },
      ],
    },
  ];
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [questions, setQuestions] = useState(initQuestions);
  const [listQuiz, setListQuiz] = useState([]);
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  const [dataPreviewImage, setDataPreviewImage] = useState(null);
  const handleAddRemoveQuestion = (type, questionId) => {
    if (type === "ADD") {
      const newQuestion = {
        id: uuidv4(),
        description: "",
        imageFile: "",
        answers: [
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
          {
            id: uuidv4(),
            description: "",
            isCorrect: false,
          },
        ],
      };
      setQuestions([...questions, newQuestion]);
    } else if (type === "REMOVE") {
      let questionsClone = _.cloneDeep(questions);
      questionsClone = questionsClone.filter(
        (question) => question.id !== questionId
      );
      setQuestions(questionsClone);
    }
  };
  const handleAddRemoveAnswer = (type, questionId, answerId) => {
    const questionsClone = _.cloneDeep(questions);
    if (type === "ADD") {
      const newAnswer = {
        id: uuidv4(),
        description: "",
        isCorrect: false,
      };
      const index = questionsClone.findIndex(
        (question) => question.id === questionId
      );
      if (index > -1) {
        questionsClone[index].answers.push(newAnswer);
        setQuestions(questionsClone);
      }
    } else if (type === "REMOVE") {
      const index = questionsClone.findIndex(
        (question) => question.id === questionId
      );
      if (index > -1) {
        questionsClone[index].answers = questionsClone[index].answers.filter(
          (answer) => answer.id !== answerId
        );
        setQuestions(questionsClone);
      }
    }
  };
  const handleOnChange = (questionId, value) => {
    const questionsClone = _.cloneDeep(questions);
    const index = questionsClone.findIndex(
      (question) => question.id === questionId
    );
    if (index > -1) {
      questionsClone[index].description = value;
      setQuestions(questionsClone);
    }
  };
  const handleOnChangeFileQuestion = (event, questionId) => {
    const questionsClone = _.cloneDeep(questions);
    const index = questionsClone.findIndex(
      (question) => question.id === questionId
    );
    if (index > -1) {
      questionsClone[index].imageFile = event.target.files[0];
      questionsClone[index].imageName = event.target.files[0].name;
      setQuestions(questionsClone);
    }
  };
  const handleAnswerQuestion = (type, questionId, answerId, value) => {
    const questionsClone = _.cloneDeep(questions);
    const index = questionsClone.findIndex(
      (question) => question.id === questionId
    );
    if (index > -1) {
      questionsClone[index].answers = questionsClone[index].answers.map(
        (answer) => {
          if (answer.id === answerId) {
            if (type === "CHECKBOX") {
              answer.isCorrect = value;
            } else if (type === "INPUT") {
              answer.description = value;
            }
          }
          return answer;
        }
      );
      setQuestions(questionsClone);
    }
  };
  const handlePreviewImage = (questionId) => {
    setIsPreviewImage(true);
    const questionsClone = _.cloneDeep(questions);
    const index = questionsClone.findIndex(
      (question) => question.id === questionId
    );
    if (index > -1) {
      setDataPreviewImage({
        url: URL.createObjectURL(questionsClone[index].imageFile),
        title: questionsClone[index].imageName,
      });
    }
  };
  const handleSubmitQuestionAnswerForQuiz = async () => {
    // validate
    if (_.isEmpty(selectedQuiz)) {
      toast.error("Please choose a Quiz");
      return;
    }
    // validate question
    let isValidQuestion = true;
    let indexQuestion = 0;
    for (let i = 0; i < questions.length; i++) {
      if (!questions[i].description) {
        isValidQuestion = false;
        indexQuestion = i;
        break;
      }
    }
    if (isValidQuestion === false) {
      toast.error(`Not empty description for Question ${indexQuestion + 1}`);
      return;
    }
    // validate answer
    let isValidAnswer = true;
    let indexQuestionOfAnswer = 0;
    let indexAnswer = 0;
    for (let i = 0; i < questions.length; i++) {
      for (let j = 0; j < questions[i].answers.length; j++) {
        if (!questions[i].answers[j].description) {
          isValidAnswer = false;
          indexAnswer = j;
          break;
        }
      }
      indexQuestionOfAnswer = i;
      if (isValidAnswer === false) break;
    }
    if (isValidAnswer === false) {
      toast.error(
        `Not empty Answer ${indexAnswer + 1} at Question ${
          indexQuestionOfAnswer + 1
        }`
      );
      return;
    }

    //submit API
    for (const question of questions) {
      const q = await postCreateNewQuestion(
        selectedQuiz.value,
        question.description,
        question.imageFile
      );
      for (const answer of question.answers) {
        await postCreateNewAnswer(
          q.DT.id,
          answer.description,
          answer.isCorrect
        );
      }
    }
    toast.success("Created questions and answers for Quiz successfully!!!");
    setQuestions(initQuestions);
  };
  const fetchListQuiz = async () => {
    const res = await getAllQuiz();
    if (res && res.EC === 0) {
      const newListQuiz = res.DT?.map((item) => {
        return {
          value: item.id,
          label: `${item.id} - ${item.description}`,
        };
      });
      setListQuiz(newListQuiz);
    }
  };
  useEffect(() => {
    fetchListQuiz();
  }, []);
  return (
    <div className="manage-question-container">
      <h1 className="manage-question-title">Manage Questions</h1>
      <div className="manage-question-select-quiz">
        <span>Select Quiz:</span>
        <Select
          defaultValue={selectedQuiz}
          onChange={setSelectedQuiz}
          options={listQuiz}
        />
      </div>
      <h1 className="manage-question-add">Add questions</h1>
      <form className="manage-question-form">
        {questions &&
          questions.length > 0 &&
          questions.map((question, index) => (
            <div key={question.id} className="mb-5">
              <div className="question-add">
                <div className="question-add-group">
                  <Label>Question {index + 1} of description</Label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Please enter description of question"
                    onChange={(event) =>
                      handleOnChange(question.id, event.target.value)
                    }
                  ></input>
                </div>
                <div className="question-media">
                  <label htmlFor={question.id}>
                    <RiImageAddLine size="25px" color="#9f55ce" />
                  </label>
                  <input
                    type="file"
                    hidden
                    id={question.id}
                    onChange={(event) =>
                      handleOnChangeFileQuestion(event, question.id)
                    }
                  />
                  <span>
                    {question.imageName ? (
                      <span onClick={() => handlePreviewImage(question.id)}>
                        {question.imageName}
                      </span>
                    ) : (
                      "0 file is uploaded"
                    )}
                  </span>
                </div>
                <div className="question-count">
                  <span onClick={() => handleAddRemoveQuestion("ADD")}>
                    <BsPlusCircleFill size="25px" color="red" />
                  </span>
                  {questions && questions.length > 1 && (
                    <span
                      onClick={() =>
                        handleAddRemoveQuestion("REMOVE", question?.id)
                      }
                    >
                      <AiFillMinusCircle size="28px" color="green" />
                    </span>
                  )}
                </div>
              </div>
              {question &&
                question.answers.length > 0 &&
                question.answers.map((answer, index) => (
                  <div key={answer.id} className="answer-add">
                    <div className="answer-input">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        onChange={(event) =>
                          handleAnswerQuestion(
                            "CHECKBOX",
                            question.id,
                            answer.id,
                            event.target.checked
                          )
                        }
                      />
                      <input
                        type="text"
                        className="form-control"
                        placeholder={`Please enter answer ${index + 1}`}
                        onChange={(event) =>
                          handleAnswerQuestion(
                            "INPUT",
                            question.id,
                            answer.id,
                            event.target.value
                          )
                        }
                      ></input>
                    </div>
                    <div className="answer-count">
                      <span
                        onClick={() =>
                          handleAddRemoveAnswer("ADD", question?.id, answer.id)
                        }
                      >
                        <BsPatchPlusFill size="25px" color="#ffa11a" />
                      </span>
                      {question.answers?.length > 1 && (
                        <span
                          onClick={() =>
                            handleAddRemoveAnswer(
                              "REMOVE",
                              question?.id,
                              answer.id
                            )
                          }
                        >
                          <BsPatchMinusFill size="25px" color="#0d6efd" />
                        </span>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ))}
        <div className="manage-question-button">
          <Button
            type="button"
            bgc="yellow"
            noBorder={true}
            onClick={() => handleSubmitQuestionAnswerForQuiz()}
          >
            Save Questions
          </Button>
        </div>
        {isPreviewImage && (
          <Lightbox
            image={dataPreviewImage.url}
            title={dataPreviewImage.title}
            onClose={() => setIsPreviewImage(false)}
          ></Lightbox>
        )}
      </form>
    </div>
  );
};

export default ManageQuestion;
