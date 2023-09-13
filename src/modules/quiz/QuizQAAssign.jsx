import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";
import ManageQuiz from "./ManageQuiz";
import { useState } from "react";
import AssignQuiz from "./AssignQuiz";
import UpdateQuizQA from "./UpdateQuizQA";

const QuizQAAssign = () => {
  const [key, setKey] = useState("quiz");
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="quiz" title="Manage Quizzes">
        <ManageQuiz />
      </Tab>
      <Tab eventKey="update" title="Update Q/A">
        <UpdateQuizQA />
      </Tab>
      <Tab eventKey="assign" title="Assign">
        <AssignQuiz />
      </Tab>
    </Tabs>
  );
};

export default QuizQAAssign;
