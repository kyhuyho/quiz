import instance from "../utils/axiosCustomize";

const postCreateNewUser = (email, password, username, role, userImage) => {
  const data = new FormData();
  data.append("email", email);
  data.append("password", password);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", userImage);
  return instance.post("api/v1/participant", data);
};

const getAllUserWithPagination = (page = 1, limit) => {
  return instance.get(`api/v1/participant?page=${page}&limit=${limit}`);
};

const getAllUser = () => {
  return instance.get("api/v1/participant/all");
};

const putUpdateUser = (id, username, role, userImage) => {
  const data = new FormData();
  data.append("id", id);
  data.append("username", username);
  data.append("role", role);
  data.append("userImage", userImage);
  return instance.put("api/v1/participant", data);
};

const deleteUser = (userId) => {
  return instance.delete("api/v1/participant", { data: { id: userId } });
};

export {
  postCreateNewUser,
  getAllUserWithPagination,
  getAllUser,
  putUpdateUser,
  deleteUser,
};
