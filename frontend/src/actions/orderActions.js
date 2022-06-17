import * as constants from "../constants/orderConstants";

import axios from "axios";
import { CART_CLEAR_ITEMS } from "../constants/cartConstants";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    dispatch({ type: constants.ORDER_CREATE_REQUEST });
    const { data } = await axios.post(`/api/orders/add/`, order, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: constants.ORDER_CREATE_SUCCESS, payload: data });
    dispatch({ type: CART_CLEAR_ITEMS, payload: data });
    localStorage.removeItem("cartItems");
  } catch (error) {
    dispatch({
      type: constants.ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    dispatch({ type: constants.ORDER_DETAILS_REQUEST });
    const { data } = await axios.get(`/api/orders/${id}/`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: constants.ORDER_DETAILS_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: constants.ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const payOrder = (id, paymentResult) => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    dispatch({ type: constants.ORDER_PAY_REQUEST });
    const { data } = await axios.put(`/api/orders/${id}/pay/`, paymentResult, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: constants.ORDER_PAY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: constants.ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    const {
      userLogin: { userInfo },
    } = getState();

    dispatch({ type: constants.ORDER_LIST_MY_REQUEST });
    const { data } = await axios.get('/api/orders/myorders/', {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    });
    dispatch({ type: constants.ORDER_LIST_MY_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: constants.ORDER_LIST_MY_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message,
    });
  }
};