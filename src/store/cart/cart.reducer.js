import { CART_REDUCER_TYPES } from "./cart.types";

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartTotal: 0,
  cartCount: 0
}

export const cartReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case CART_REDUCER_TYPES.SET_CART_ITEMS:
      return {
        ...state,
        ...payload
      }
    case CART_REDUCER_TYPES.SET_CART_OPEN:
      return {
        ...state,
        isCartOpen: payload
      }
    default:
      throw new Error(`Unhandled type ${type} in cartReducer`);
  }
}
