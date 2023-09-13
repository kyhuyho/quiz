import {
  Bar,
  BarChart,
  Legend,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import "../../styles/Dashboard.scss";
import { Tooltip } from "bootstrap";
import { useEffect, useState } from "react";
import { getDataOverview } from "../../services/authServices";

const Dashboard = () => {
  const [dataOverview, setDataOverview] = useState(null);
  const [dataCharts, setDataCharts] = useState(null);
  const fetchDataOverview = async () => {
    const res = await getDataOverview();
    if (res && res.EC === 0) {
      setDataOverview(res.DT);
      const data = [
        {
          name: "Quizzes",
          Qz: res.DT.others.countQuiz,
        },
        {
          name: "Questions",
          Qs: res.DT.others.countQuestions,
        },
        {
          name: "Answers",
          As: res.DT.others.countAnswers,
        },
      ];
      setDataCharts(data);
    }
  };
  useEffect(() => {
    fetchDataOverview();
  }, []);
  return (
    <div className="dashboard">
      <h1>Analytics Dashboard</h1>
      <div className="d-flex gap-5 mt-5">
        <div className="w-50 d-flex flex-wrap dashboard-data">
          <div className="dashboard-data-item">
            <span>Total Users</span>
            <span>{dataOverview?.users.countUsers}</span>
          </div>
          <div className="dashboard-data-item">
            <span>Total Quizzes</span>
            <span>{dataOverview?.others.countQuiz}</span>
          </div>
          <div className="dashboard-data-item">
            <span>Total Questions</span>
            <span>{dataOverview?.others.countQuestions}</span>
          </div>
          <div className="dashboard-data-item">
            <span>Total Answers</span>
            <span>{dataOverview?.others.countAnswers}</span>
          </div>
        </div>
        <div className="w-50">
          <ResponsiveContainer width="95%" height={400}>
            <BarChart data={dataCharts}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Qz" fill="#8884d8" />
              <Bar dataKey="Qs" fill="#82ca9d" />
              <Bar dataKey="As" fill="#f7ef20" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
