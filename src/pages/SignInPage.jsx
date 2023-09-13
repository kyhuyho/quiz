import Loading from "../components/loading/Loading";
import Label from "../components/label/Label";
import InputPasswordToggle from "../components/input/InputPasswordToggle";
import Input from "../components/input/Input";
import Button from "../components/button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { postSignIn } from "../services/authServices";
import { NavLink } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import { doSignIn } from "../redux/action/userAction";
import "../styles/Form.scss";

const schema = yup
  .object({
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

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleSingIn = async (values) => {
    const res = await postSignIn(values.email, values.password);
    if (res && res.EC === 0) {
      dispatch(doSignIn(res));
      toast.success(res.EM);
      navigate("/");
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
      <form onSubmit={handleSubmit(handleSingIn)}>
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
          {isSubmitting ? <Loading /> : "Sign In"}
        </Button>
      </form>
      <div className="form-account">
        <span>
          Do not have an account?
          <NavLink to="/signup">Sign Up</NavLink>
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

export default SignInPage;
