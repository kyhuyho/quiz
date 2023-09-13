/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import "../../styles/Button.scss";

const Button = ({ children, bgc, to, size, noBorder, state, ...props }) => {
  const navigate = useNavigate();
  let colorClassName = "";
  switch (bgc) {
    case "dark":
      colorClassName = "bg-dark text-white";
      break;
    case "blue":
      colorClassName = "bg-primary text-white";
      break;
    case "light":
      colorClassName = "bg-light";
      break;
    case "yellow":
      colorClassName = "bg-warning";
      break;

    default:
      break;
  }
  if (to) {
    return (
      <button
        className={` px-4 ${
          noBorder ? "border-0" : ""
        } rounded ${colorClassName} ${size ? "w-100" : ""} button`}
        onClick={() => navigate(to, state)}
      >
        {children}
      </button>
    );
  }
  return (
    <button
      className={` px-4 ${
        noBorder ? "border-0" : ""
      } rounded ${colorClassName} ${size ? "w-100" : ""} ${
        props.disabled ? "opacity-50" : ""
      } button`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
