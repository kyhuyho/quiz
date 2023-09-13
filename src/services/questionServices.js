import instance from "../utils/axiosCustomize";

const getQuestionByQuizId = (quizId) => {
  return instance.get(`api/v1/questions-by-quiz?quizId=${quizId}`);
};

const postCreateNewQuestion = (quiz_id, description, questionImage) => {
  const data = new FormData();
  data.append("quiz_id", quiz_id);
  data.append("description", description);
  data.append("questionImage", questionImage);
  return instance.post("api/v1/question", data);
};

export { getQuestionByQuizId, postCreateNewQuestion };
