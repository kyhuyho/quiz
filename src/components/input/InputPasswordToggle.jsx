/* eslint-disable react/prop-types */
import Input from "./Input";
import { useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import "../../styles/Form.scss";

const InputPasswordToggle = ({ control }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  return (
    <div className="form-group-child">
      <Input
        type={`${isShowPassword ? "text" : "password"}`}
        name="password"
        id="password"
        control={control}
        placeholder="Please enter your password"
      />
      <span onClick={() => setIsShowPassword(!isShowPassword)}>
        {isShowPassword ? (
          <AiFillEye size="20px" />
        ) : (
          <AiFillEyeInvisible size="20px" />
        )}
      </span>
    </div>
  );
};

export default InputPasswordToggle;
