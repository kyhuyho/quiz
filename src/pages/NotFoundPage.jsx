import NotFoundImage from "../assets/404-image.jpg";
import Button from "../components/button/Button";
import "../styles/NotFound.scss";

const NotFoundPage = () => {
  return (
    <div className="not-found">
      <img srcSet={`${NotFoundImage} 2x`} alt="" />
      <Button bgc="dark" to="/">
        Back To Home
      </Button>
    </div>
  );
};

export default NotFoundPage;
