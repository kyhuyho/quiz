/* eslint-disable react/prop-types */
import { AiFillEye } from "react-icons/ai";

const View = ({ onClick = () => {} }) => {
  return (
    <span title="View" onClick={onClick}>
      <AiFillEye size="20px" />
    </span>
  );
};

export default View;
