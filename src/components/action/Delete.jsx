/* eslint-disable react/prop-types */
import { BsFillTrashFill } from "react-icons/bs";

const Delete = ({ onClick = () => {} }) => {
  return (
    <span title="Delete" onClick={onClick}>
      <BsFillTrashFill size="20px" />
    </span>
  );
};

export default Delete;
