/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import { useController } from "react-hook-form";

const Input = ({ type, name, control, ...props }) => {
  const { field } = useController({ name, control, defaultValue: "" });
  return (
    <input className="form-control" type={type} {...field} {...props}></input>
  );
};

export default Input;
