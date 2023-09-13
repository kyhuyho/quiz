import Loading from "../components/loading/Loading";
import Label from "../components/label/Label";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { postSignUp } from "../services/authServices";
import { NavLink, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

const schema = yup
  .object({
    username: yup.string().required("Please enter your username"),
    email: yup
      .string()
      .email("Please enter valid email address")
      .required("Please enter your email address"),
    password: yup
      .string()
      .min(6, "Your password must be at least 6 characters or greater")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Your password must have at least 1 uppercase, 1 lowercase, 1 special character",
        }
      )
      .required("Please enter your password"),
  })
  .required();
const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSingUp = async (values) => {
    const res = await postSignUp(
      values.email,
      values.username,
      values.password
    );
    if (res && res.EC === 0) {
      toast.success(res.EM);
      navigate("/signin");
    } else toast.error(res.EM);
  };
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) toast.error(arrErrors[0]?.message);
  }, [errors]);
  return (
    <div className="form mx-auto">
      <h1 className="text-center mb-3 form-title">Quizzes</h1>
      <span className="d-block text-center form-intro">
        Hello, who is this?
      </span>
      <form onSubmit={handleSubmit(handleSingUp)}>
        <div className="form-group">
          <Label htmlFor="username">User name</Label>
          <Input
            type="text"
            name="username"
            id="username"
            control={control}
            placeholder="Please enter your username"
          />
        </div>
        <div className="form-group">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            id="email"
            control={control}
            placeholder="Please enter your email"
          />
        </div>
        <div className="form-group">
          <Label htmlFor="password">Password</Label>
          <InputPasswordToggle control={control} />
        </div>
        <Button size={true} bgc="dark" disabled={isSubmitting}>
          {isSubmitting ? <Loading /> : "Sign Up"}
        </Button>
      </form>
      <div className="form-account">
        <span>
          Do have an account?
          <NavLink to="/signin">Sign In</NavLink>
        </span>
      </div>
      <div className="form-back">
        <NavLink to="/">
          <FaArrowLeft />
          Back To Home
        </NavLink>
      </div>
    </div>
  );
};

export default SignUpPage;
