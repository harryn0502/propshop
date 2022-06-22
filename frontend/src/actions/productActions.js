import * as constants from "../constants/productConstants";
import axios from "axios";

export const listProducts = (keyword="") => async (dispatch) => {
    try {
        dispatch({ type: constants.PRODUCT_LIST_REQUEST });
        const { data } = await axios.get(`/api/products${keyword}`);
        dispatch({ type: constants.PRODUCT_LIST_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: constants.PRODUCT_LIST_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const listProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: constants.PRODUCT_DETAILS_REQUEST });
        const { data } = await axios.get(`/api/products/${id}`);
        dispatch({ type: constants.PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: constants.PRODUCT_DETAILS_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        dispatch({ type: constants.PRODUCT_DELETE_REQUEST });
        await axios.delete(`/api/products/delete/${id}/`, {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        dispatch({ type: constants.PRODUCT_DELETE_SUCCESS });
    } catch (error) {
        dispatch({
            type: constants.PRODUCT_DELETE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const createProduct = () => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        dispatch({ type: constants.PRODUCT_CREATE_REQUEST });
        const { data } = await axios.post(
            `/api/products/create/`,
            {},
            {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }
        );
        dispatch({ type: constants.PRODUCT_CREATE_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: constants.PRODUCT_CREATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState();

        dispatch({ type: constants.PRODUCT_UPDATE_REQUEST });
        const { data } = await axios.put(
            `/api/products/update/${product._id}/`,
            product,
            {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`,
                },
            }
        );
        dispatch({ type: constants.PRODUCT_UPDATE_SUCCESS, payload: data });

        dispatch({ type: constants.PRODUCT_DETAILS_SUCCESS, payload: data });
    } catch (error) {
        dispatch({
            type: constants.PRODUCT_UPDATE_FAIL,
            payload:
                error.response && error.response.data.detail
                    ? error.response.data.detail
                    : error.message,
        });
    }
};

export const createProductReview =
    (productID, review) => async (dispatch, getState) => {
        try {
            const {
                userLogin: { userInfo },
            } = getState();

            dispatch({ type: constants.PRODUCT_CREATE_REVIEW_REQUEST });
            const { data } = await axios.post(
                `/api/products/${productID}/reviews/`,
                review,
                {
                    headers: {
                        "Content-type": "application/json",
                        Authorization: `Bearer ${userInfo.token}`,
                    },
                }
            );
            dispatch({
                type: constants.PRODUCT_CREATE_REVIEW_SUCCESS,
                payload: data,
            });
        } catch (error) {
            dispatch({
                type: constants.PRODUCT_CREATE_REVIEW_FAIL,
                payload:
                    error.response && error.response.data.detail
                        ? error.response.data.detail
                        : error.message,
            });
        }
    };
