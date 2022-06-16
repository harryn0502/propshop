import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  SAVE_PAYMENT_METHOD,
  SAVE_SHIPPING_ADDRESS,
  CART_CLEAR_ITEMS,
} from "../constants/cartConstants";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {}, paymentMethod: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      const item = action.payload;
      const eixistItem = state.cartItems.find(
        (x) => x.product === item.product
      );
      if (eixistItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === eixistItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case SAVE_SHIPPING_ADDRESS:
      return { ...state, shippingAddress: action.payload };

    case SAVE_PAYMENT_METHOD:
      return { ...state, paymentMethod: action.payload };

    case CART_CLEAR_ITEMS:
      return { ...state, cartItems: [] };

    default:
      return state;
  }
};
