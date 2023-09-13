export const SIGN_IN_SUCCESS = "SIGN_IN_SUCCESS";
export const LOG_OUT_SUCCESS = "LOG_OUT_SUCCESS";

export const doSignIn = (data) => ({
  type: SIGN_IN_SUCCESS,
  payload: data,
});

export const doLogOut = () => ({
  type: LOG_OUT_SUCCESS,
});
