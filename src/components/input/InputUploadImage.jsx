/* eslint-disable react/prop-types */
import Label from "../label/Label";
import "../../styles/InputUploadImage.scss";

const InputUploadImage = ({
  previewImage,
  idImage,
  handleChangeFileImage = () => {},
}) => {
  return (
    <div className="upload-image">
      <Label htmlFor={idImage} isImage={true}>
        Choose Image
      </Label>
      <input
        type="file"
        id={idImage}
        hidden
        onChange={(event) => handleChangeFileImage(event)}
      />
      <div className="show-image">
        {previewImage ? (
          <img src={previewImage} alt="" />
        ) : (
          <span>Preview Image</span>
        )}
      </div>
    </div>
  );
};

export default InputUploadImage;
