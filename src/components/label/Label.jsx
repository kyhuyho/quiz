/* eslint-disable react/prop-types */
const Label = ({ children, htmlFor, isImage }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`${isImage ? "upload-image-label" : ""}`}
    >
      {children}
    </label>
  );
};

export default Label;
