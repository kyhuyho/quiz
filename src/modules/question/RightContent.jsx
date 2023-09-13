/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import "../../styles/RightContent.scss";

const RightContent = ({
  dataQuiz,
  handleFinish = () => {},
  setIndex = () => {},
}) => {
  const [seconds, setSeconds] = useState(300);
  const refDiv = useRef([]);
  const toHHMMSS = (secs) => {
    const sec_num = parseInt(secs, 10);
    const hours = Math.floor(sec_num / 3600);
    const minutes = Math.floor(sec_num / 60) % 60;
    const seconds = sec_num % 60;
    return [hours, minutes, seconds]
      .map((v) => (v < 10 ? "0" + v : v))
      .filter((v, i) => v !== "00" || i > 0)
      .join(":");
  };
  const getClassNameQuestion = (question) => {
    if (question && question.answers.length > 0) {
      const inUnAnswered = question.answers.every(
        (item) => item.isSelected === false
      );
      if (inUnAnswered === false) return "right-content-spin selected";
    }
    return "right-content-spin";
  };
  const handleClickQuestion = (question, index) => {
    setIndex(index);
    if (refDiv && refDiv.current) {
      refDiv.current.forEach((item) => {
        if (item && item.className === "right-content-spin clicked") {
          item.className = "right-content-spin";
        }
      });
      if (question && question.answers.length > 0) {
        const inUnAnswered = question.answers.every(
          (item) => item.isSelected === false
        );
        if (inUnAnswered === false) return "right-content-spin selected";
      }
    }
    return (refDiv.current[index].className = "right-content-spin clicked");
  };
  useEffect(() => {
    if (seconds === 0) {
      handleFinish();
      return;
    }
    const timer = setInterval(() => {
      setSeconds(seconds - 1);
    }, 1000);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds]);
  return (
    <div className="right-content">
      <p className="right-content-time">{toHHMMSS(seconds)}</p>
      <hr />
      <div className="right-content-count">
        {dataQuiz &&
          dataQuiz.length > 0 &&
          dataQuiz.map((item, index) => (
            <div
              key={item.questionId}
              className={getClassNameQuestion(item)}
              onClick={() => handleClickQuestion(item, index)}
              ref={(ref) => (refDiv.current[index] = ref)}
            >
              {index + 1}
            </div>
          ))}
      </div>
    </div>
  );
};

export default RightContent;
