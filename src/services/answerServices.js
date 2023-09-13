import instance from "../utils/axiosCustomize";

const postSubmitAnswer = (data) => {
  return instance.post("api/v1/quiz-submit", { ...data });
};

const postCreateNewAnswer = (question_id, description, correct_answer) => {
  return instance.post("api/v1/answer", {
    question_id,
    description,
    correct_answer,
  });
};

export { postSubmitAnswer, postCreateNewAnswer };
