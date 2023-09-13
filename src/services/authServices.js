import instance from "../utils/axiosCustomize";

const postSignIn = (email, password) => {
  return instance.post("api/v1/login", {
    email,
    password,
  });
};

const postSignUp = (email, username, password) => {
  return instance.post("api/v1/register", {
    email,
    username,
    password,
  });
};

const postLogOut = (email, refresh_token) => {
  return instance.post("api/v1/logout", { email, refresh_token });
};

const getHistory = () => {
  return instance.get("api/v1/history");
};

const postChangePassword = (current_password, new_password) => {
  return instance.post("api/v1/change-password", {
    current_password,
    new_password,
  });
};

const postUpdateProfile = (username, userImage) => {
  const data = new FormData();
  data.append("username", username);
  data.append("userImage", userImage);
  return instance.post("api/v1/profile", data);
};

const getDataOverview = () => {
  return instance.get("api/v1/overview");
};

export {
  postSignIn,
  postSignUp,
  postLogOut,
  getHistory,
  postChangePassword,
  postUpdateProfile,
  getDataOverview,
};
