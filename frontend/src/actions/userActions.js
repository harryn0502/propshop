import * as constants from "../constants/userConstants";
import axios from "axios";

export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: constants.USER_LOGIN_REQUEST });
    const { data } = await axios.post(
      "/api/users/login/",
      {
        username: email,
        password: password,
      },
      { headers: { "Content-Type": "application/json" } }
    );

    dispatch({ type: constants.USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: constants.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const register =
  (first_name, last_name, email, password) => async (dispatch) => {
    try {
      console.log(first_name, last_name, email, password);
      dispatch({ type: constants.USER_REGISTER_REQUEST });
      const { data } = await axios.post(
        "/api/users/register/",
        {
          first_name: first_name,
          last_name: last_name,
          email: email,
          password: password,
        },
        { headers: { "Content-Type": "application/json" } }
      );

      dispatch({ type: constants.USER_REGISTER_SUCCESS, payload: data });

      dispatch({ type: constants.USER_LOGIN_SUCCESS, payload: data });

      localStorage.setItem("userInfo", JSON.stringify(data));
    } catch (error) {
      dispatch({
        type: constants.USER_REGISTER_FAIL,
        payload:
          error.response && error.response.data.detail
            ? error.response.data.detail
            : error.message,
      });
    }
  };

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: constants.USER_LOGOUT });
};
