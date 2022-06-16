import { CART_ADD_ITEM, CART_REMOVE_ITEM, SAVE_PAYMENT_METHOD, SAVE_SHIPPING_ADDRESS } from "../constants/cartConstants";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const json = await (await fetch(`/api/products/${id}`)).json();

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      product: json._id,
      name: json.name,
      image: json.image,
      price: json.price,
      countInStock: json.countInStock,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const removeFromCart = (id) => async (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id,
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shippingAddress", JSON.stringify(data));
};


export const savePaymentMethod = (data) => async (dispatch, getState) => {
  dispatch({
    type: SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("paymentMethod", JSON.stringify(getState().cart.paymentMethod));
};
