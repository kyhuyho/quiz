/* eslint-disable react/prop-types */
import { AiFillEdit } from "react-icons/ai";

const Edit = ({ onClick = () => {} }) => {
  return (
    <span title="Edit" onClick={onClick}>
      <AiFillEdit size="20px" />
    </span>
  );
};

export default Edit;
