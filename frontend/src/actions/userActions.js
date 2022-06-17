import * as constants from "../constants/userConstants";
import { ORDER_LIST_MY_RESET } from "../constants/orderConstants";
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

export const logout = () => (dispatch) => {
  localStorage.removeItem("userInfo");
  dispatch({ type: constants.USER_LOGOUT });
  dispatch({ type: constants.USER_DETAILS_RESET });
  dispatch({ type: ORDER_LIST_MY_RESET });
};

export const register =
  (first_name, last_name, email, password) => async (dispatch) => {
    try {
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

export const getUserDetails = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    dispatch({ type: constants.USER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/users/${id}/`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: constants.USER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: constants.USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const updateUser = (user) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    dispatch({ type: constants.USER_UPDATE_REQUEST });
    const { data } = await axios.put(`/api/users/profile/update/`, user, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: constants.USER_UPDATE_SUCCESS, payload: data });

    dispatch({ type: constants.USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: constants.USER_UPDATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};
