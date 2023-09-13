import { LOG_OUT_SUCCESS, SIGN_IN_SUCCESS } from "../action/userAction";

const INITIAL_STATE = {
  account: {
    access_token: "",
    refresh_token: "",
    username: "",
    email: "",
    role: "",
    image: "",
  },
  isAuthenticated: false,
};

const userReducer = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        account: {
          access_token: actions?.payload?.DT?.access_token,
          refresh_token: actions?.payload?.DT?.refresh_token,
          username: actions?.payload?.DT?.username,
          email: actions?.payload?.DT?.email,
          role: actions?.payload?.DT?.role,
          image: actions?.payload?.DT?.image,
        },
        isAuthenticated: true,
      };
    case LOG_OUT_SUCCESS:
      return {
        ...state,
        account: {
          access_token: "",
          refresh_token: "",
          username: "",
          email: "",
          role: "",
          image: "",
        },
        isAuthenticated: false,
      };

    default:
      return state;
  }
};

export default userReducer;
