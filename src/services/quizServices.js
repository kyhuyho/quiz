import instance from "../utils/axiosCustomize";

const getAllQuizByUser = () => {
  return instance.get("api/v1/quiz-by-participant");
};

const postCreateNewQuiz = (description, name, difficulty, quizImage) => {
  const data = new FormData();
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);
  return instance.post("api/v1/quiz", data);
};

const getAllQuiz = () => {
  return instance.get("api/v1/quiz/all");
};

const putUpdateQuiz = (id, description, name, difficulty, quizImage) => {
  const data = new FormData();
  data.append("id", id);
  data.append("description", description);
  data.append("name", name);
  data.append("difficulty", difficulty);
  data.append("quizImage", quizImage);
  return instance.put("api/v1/quiz", data);
};

const deleteQuiz = (quizId) => {
  return instance.delete(`api/v1/quiz/${quizId}`);
};

const postAssignQuizForUser = (quizId, userId) => {
  return instance.post("api/v1/quiz-assign-to-user", { quizId, userId });
};

const getQuizWithQA = (quizId) => {
  return instance.get(`api/v1/quiz-with-qa/${quizId}`);
};

const postUpsertWithQA = (data) => {
  return instance.post("api/v1/quiz-upsert-qa", { ...data });
};

export {
  getAllQuizByUser,
  postCreateNewQuiz,
  getAllQuiz,
  putUpdateQuiz,
  deleteQuiz,
  postAssignQuizForUser,
  getQuizWithQA,
  postUpsertWithQA,
};
