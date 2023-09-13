import Button from "../components/button/Button";
import video from "../assets/video-homepage.mp4";
import "../styles/HomePage.scss";
import { useSelector } from "react-redux";

const HomePage = () => {
  const account = useSelector((state) => state.user);
  return (
    <div className="d-flex align-items-center container-layout home-page-container">
      <div className="w-50">
        <h1>Easy online quiz maker: beautiful quizzes in minutes</h1>
        <p>
          Quizzes are a powerful tool for engagement, and wildly underrated for
          bringing in more customers. Take yours to the next level with
          Typeform.
        </p>
        {account?.isAuthenticated ? (
          <Button bgc="dark">Doing Quizzes</Button>
        ) : (
          <Button to="/signin" bgc="dark">
            Get started - It is free
          </Button>
        )}
      </div>
      <div className="w-50">
        <video className="home-page-video" autoPlay muted loop>
          <source src={video} type="video/mp4" />
        </video>
      </div>
    </div>
  );
};

export default HomePage;
