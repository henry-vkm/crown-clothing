import { useReducer } from "react";
import { createContext, useEffect, useState } from "react";

export const CartContext = createContext({
  isCartOpen: false,
  setIsCartOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearItemFromCart: () => {},
  cartCount: 0,
  cartTotal: 0
});

export const CART_REDUCER_TYPES = {
  SET_CART_OPEN: 'SET_CART_OPEN',
  SET_CART_ITEMS: 'SET_CART_ITEMS',
}

const cartReducer = (state, action) => {
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

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartTotal: 0,
  cartCount: 0
}

const addCartItem = (cartItems, productToAdd) => {
  const existingItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);

  if (existingItem) {
    return cartItems.map(cartItem => {
      return (
        cartItem.id === productToAdd.id 
        ? {...cartItem, quantity: cartItem.quantity + 1} 
        : cartItem
      )
    }) 
  }
  
  return [...cartItems, { ...productToAdd, quantity : 1 }]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
  const existingItem = cartItems.find(cartItem => cartItem.id === cartItemToRemove.id);

  if (existingItem.quantity === 1) {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id);
  }

  return cartItems.map(cartItem => {
    return (
      cartItem.id === cartItemToRemove.id
      ? {...cartItem, quantity: cartItem.quantity - 1}
      : cartItem
     )
  })
}

const clearCartItem = (cartItems, cartItemToClear) => {
  return cartItems.filter(cartItem => cartItem.id !== cartItemToClear.id);
}

export const CartProvider = ({ children }) => {
  const [{
    isCartOpen, 
    cartItems,
    cartCount,
    cartTotal
  }, dispatch] = useReducer(cartReducer, INITIAL_STATE)
  // const [isCartOpen, setIsCartOpen] = useState(false);
  // const [cartItems, setCartItems] = useState([]);
  // const [cartCount, setCartCount] = useState(0);
  // const [cartTotal, setCartTotal] = useState(0);

  const updateCartItems = (cartItems) => {
    const newCartTotal = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity * cartItem.price;
    }, 0);

    const newCartCount = cartItems.reduce((total, cartItem) => {
      return total + cartItem.quantity;
    }, 0)

    dispatch({
      type: CART_REDUCER_TYPES.SET_CART_ITEMS,
      payload: {
        cartItems,
        cartTotal: newCartTotal,
        cartCount: newCartCount
      }
    })
  }

  const setIsCartOpen = (value) => {
    dispatch({ type: CART_REDUCER_TYPES.SET_CART_OPEN, payload: value })
  }

  // useEffect(() => {
  //   const newCartCount = cartItems.reduce((total, cartItem) => {
  //     return total + cartItem.quantity;
  //   }, 0)

  //   setCartCount(newCartCount);
  // }, [cartItems])

  // useEffect(() => {
  //   const newCartTotal = cartItems.reduce((total, cartItem) => {
  //     return total + cartItem.quantity * cartItem.price;
  //   }, 0)

  //   setCartTotal(newCartTotal);
  // }, [cartItems])

  const addItemToCart = (productToAdd) => {
    const newCartItems = addCartItem(cartItems, productToAdd);

    updateCartItems(newCartItems);
  }

  const removeItemFromCart = (cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems, cartItemToRemove);

    updateCartItems(newCartItems);
  }

  const clearItemFromCart = (cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems, cartItemToClear);

    updateCartItems(newCartItems);
  }

  const value = { 
    isCartOpen,
    setIsCartOpen,
    cartItems,
    addItemToCart,
    cartCount,
    removeItemFromCart,
    clearItemFromCart,
    cartTotal
  }

  return (
    <CartContext.Provider value={value}>
      { children }
    </CartContext.Provider>
  )
}

