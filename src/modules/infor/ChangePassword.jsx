import Label from "../../components/label/Label";
import Input from "../../components/input/Input";
import Button from "../../components/button/Button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { postChangePassword } from "../../services/authServices";

const schema = yup
  .object({
    currentPassword: yup
      .string()
      .min(6, "Your current password must be at least 6 characters or greater")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Your current password must have at least 1 uppercase, 1 lowercase, 1 special character",
        }
      ),
    newPassword: yup
      .string()
      .min(6, "Your new password must be at least 6 characters or greater")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Your new password must have at least 1 uppercase, 1 lowercase, 1 special character",
        }
      )
      .required("Please enter your password"),
  })
  .required();

// eslint-disable-next-line no-unused-vars, react/prop-types
const ChangePassword = ({ handleClose = () => {} }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const handleChangePassword = async (values) => {
    const res = await postChangePassword(
      values.currentPassword,
      values.newPassword
    );
    if (res && res.EC === 0) {
      toast.success(res.EM);
      reset({
        currentPassword: "",
        newPassword: "",
      });
      handleClose();
    } else toast.error(res.EM);
  };
  useEffect(() => {
    const arrErrors = Object.values(errors);
    if (arrErrors.length > 0) toast.error(arrErrors[0]?.message);
  }, [errors]);
  return (
    <form onSubmit={handleSubmit(handleChangePassword)}>
      <div className="d-flex gap-5">
        <div className="d-flex flex-column gap-3 w-50">
          <Label htmlFor="currentPassword">Current password</Label>
          <Input
            type="password"
            id="currentPassword"
            name="currentPassword"
            control={control}
            placeholder="Enter your current password"
          />
        </div>
        <div className="d-flex flex-column gap-3 w-50">
          <Label htmlFor="newPassword">New password</Label>
          <Input
            type="password"
            id="newPassword"
            name="newPassword"
            control={control}
            placeholder="Enter your new password"
          />
        </div>
      </div>
      <div className="mt-3">
        <Button bgc="yellow" noBorder={true}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default ChangePassword;
