import { createContext, useEffect, useState, useReducer } from "react";
import { createUserDocFromAuth, onAuthStateChangedHandler } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
  currentUser: '',
  setCurrentUser: () => {}
});

export const USER_REDUCER_TYPES = {
  SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
  const { type, payload } = action;

  switch (type) {
    case USER_REDUCER_TYPES.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: payload
      }
    default: 
      throw new Error (`Unhandled type ${type} in userReducer`);
  }
}

const INITIAL_STATE = {
  currentUser: null
}

export const UserProvider = ({ children }) => {
  const [ { currentUser }, dispatch ] = useReducer(userReducer, INITIAL_STATE); 
  // const [currentUser, setCurrentUser] = useState(null);

  const setCurrentUser = (user) => {
    dispatch({ type: USER_REDUCER_TYPES.SET_CURRENT_USER, payload: user})
  }

  const value = { currentUser, setCurrentUser };

  useEffect(() => {
    const unsubscribe = onAuthStateChangedHandler((user) => {
      if (user) {
        createUserDocFromAuth(user);
      }
      setCurrentUser(user);
    })

    return unsubscribe;
  }, [])

  return (
    <UserContext.Provider value={value}> { children } </UserContext.Provider>
  )
}
