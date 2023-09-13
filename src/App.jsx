import SignUpPage from "./pages/SignUpPage";
import SignInPage from "./pages/SignInPage";
import PrivateRoute from "./routes/PrivateRoute";
import NotFoundPage from "./pages/NotFoundPage";
import ManageUser from "./modules/user/ManageUser";
import ListQuizPage from "./pages/ListQuizPage";
import Layout from "./components/layout/Layout";
import HomePage from "./pages/HomePage";
import Dashboard from "./modules/dasboard/Dashboard";
import AdminPage from "./pages/AdminPage";
import { Route, Routes } from "react-router-dom";
import DetailQuizPage from "./pages/DetailQuizPage";
import QuizQAAssign from "./modules/quiz/QuizQAAssign";
import ManageQuestion from "./modules/question/ManageQuestion";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />}></Route>
        <Route
          path="/list-quizzes"
          element={
            <PrivateRoute>
              <ListQuizPage />
            </PrivateRoute>
          }
        ></Route>
      </Route>
      <Route path="/detail-quiz/:quizId" element={<DetailQuizPage />}></Route>
      <Route
        path="/admin"
        element={
          <PrivateRoute>
            <AdminPage />
          </PrivateRoute>
        }
      >
        <Route index element={<Dashboard />}></Route>
        <Route path="/admin/manage-users" element={<ManageUser />}></Route>
        <Route path="/admin/manage-quizzes" element={<QuizQAAssign />}></Route>
        <Route
          path="/admin/manage-questions"
          element={<ManageQuestion />}
        ></Route>
      </Route>
      <Route path="/signin" element={<SignInPage />}></Route>
      <Route path="/signup" element={<SignUpPage />}></Route>
      <Route path="*" element={<NotFoundPage />}></Route>
    </Routes>
  );
}

export default App;
