import { useEffect, useState } from "react";
import Table from "../../components/table/Table";
import { getHistory } from "../../services/authServices";

const History = () => {
  const [listHistory, setListHistory] = useState([]);
  const fetchListHistory = async () => {
    const res = await getHistory();
    if (res && res.EC === 0) {
      setListHistory(res.DT?.data);
    }
  };
  useEffect(() => {
    fetchListHistory();
  }, []);
  return (
    <div>
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Quiz Name</th>
            <th>Total Questions</th>
            <th>Total Correct</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {listHistory &&
            listHistory.length > 0 &&
            listHistory.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.quizHistory.name}</td>
                <td>{item.total_questions}</td>
                <td>{item.total_correct}</td>
                <td>{`${new Date(item.updatedAt).toLocaleDateString(
                  "VI-vi"
                )} ${new Date(item.updatedAt).getHours()}h : ${new Date(
                  item.updatedAt
                ).getMinutes()}p : ${new Date(
                  item.updatedAt
                ).getSeconds()}s`}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
};

export default History;
