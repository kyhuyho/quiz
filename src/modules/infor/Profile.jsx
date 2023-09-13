import Label from "../../components/label/Label";
import InputUploadImage from "../../components/input/InputUploadImage";
import Input from "../../components/input/Input";
import Dropdown from "../../components/dropdown/Dropdown";
import Button from "../../components/button/Button";
import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { postUpdateProfile } from "../../services/authServices";
import "../../styles/Profile.scss";

// eslint-disable-next-line react/prop-types, no-unused-vars
const Profile = ({ handleClose = () => {} }) => {
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  // const [dropdownLabel, setDropdownLabel] = useState("Please select your role");
  const account = useSelector((state) => state.user);
  const dropdownLabel = account.account.role;
  const { handleSubmit, control, setValue, reset } = useForm({
    mode: "onChange",
  });
  const handleChangeFileImage = (event) => {
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setImage(event.target.files[0]);
  };
  const handleUpdateProfile = async (values) => {
    const res = await postUpdateProfile(values.username, image);
    if (res && res.EC === 0) {
      toast.success(res.EM);
      handleClose();
    } else toast.error(res.EM);
  };
  useEffect(() => {
    reset({
      username: account.account.username,
      email: account.account.email,
    });
    setPreviewImage(`data:image/jpeg;base64, ${account.account.image}`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [account]);
  return (
    <form onSubmit={handleSubmit(handleUpdateProfile)}>
      <div className="profile-container mb-3">
        <div className="profile-item">
          <Label htmlFor="username">Username</Label>
          <Input
            type="text"
            name="username"
            control={control}
            placeholder="Please enter your username"
          />
        </div>
        <div className="profile-item">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            readOnly
            control={control}
            placeholder="Please enter your email"
          />
        </div>
        <div className="profile-item">
          <Label>Role</Label>
          <Dropdown
            name="role"
            control={control}
            setValue={setValue}
            dropdownLabel={dropdownLabel}
          />
        </div>
      </div>
      <InputUploadImage
        idImage="uploadImageProfile"
        previewImage={previewImage}
        handleChangeFileImage={handleChangeFileImage}
      />
      <div className="mt-3">
        <Button bgc="yellow" noBorder={true}>
          Save
        </Button>
      </div>
    </form>
  );
};

export default Profile;
