/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import Lightbox from "react-awesome-lightbox";
import "../../styles/Question.scss";
import { useState } from "react";
import { IoIosClose, IoIosCheckmark } from "react-icons/io";

const Question = ({
  dataQuiz,
  index,
  description,
  quizId,
  isShowAnswer,
  handleCheckBox = () => {},
}) => {
  const [isPreviewImage, setIsPreviewImage] = useState(false);
  return (
    <div className="question-container">
      <h1>{`Quiz ${quizId}: ${description}`}</h1>
      <hr />
      <div className="question-content">
        <div className="question-image">
          {dataQuiz?.image ? (
            <img
              src={`data:image/jpeg;base64,${dataQuiz.image}`}
              alt=""
              onClick={() => setIsPreviewImage(true)}
            />
          ) : (
            <></>
          )}

          {isPreviewImage && (
            <Lightbox
              image={`data:image/jpeg;base64,${dataQuiz.image}`}
              title="Image of Question"
              onClose={() => setIsPreviewImage(false)}
            ></Lightbox>
          )}
        </div>
        <div className="question-main">
          <span>{`Question ${index + 1}: ${
            dataQuiz?.description ? dataQuiz.description : ""
          }   `}</span>
          <div className="question-answer">
            {dataQuiz &&
              dataQuiz.answers.length > 0 &&
              dataQuiz.answers.map((item) => (
                <div className="form-check" key={item.id}>
                  <input
                    className="form-check-input"
                    type="checkbox"
                    checked={item.isSelected}
                    id={item.id}
                    onChange={() =>
                      handleCheckBox(dataQuiz?.questionId, item?.id)
                    }
                  />
                  <label className="form-check-label" htmlFor={item.id}>
                    {item.description}
                  </label>
                  {isShowAnswer === true && (
                    <>
                      {item.isSelected === true && item.isCorrect === false && (
                        <IoIosClose color="red" size="20px" />
                      )}

                      {item.isCorrect === true && (
                        <IoIosCheckmark color="green" size="20px" />
                      )}
                    </>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Question;
