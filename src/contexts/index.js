import { createContext } from "react";

export const AppContext = createContext({
  currentUser: null,
  isAuth: false,
  draft: null,
  pins: [],
  currentPin: null
});

export const appReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return { ...state, currentUser: action.payload };
    case "IS_LOGGED_IN":
      return { ...state, isAuth: action.payload };
    case "SIGN_OUT_USER":
      return { ...state, isAuth: false, currentUser: null };
    case "CREATE_DRAFT":
      return {
        ...state,
        currentPin: null,
        draft: { latitude: 0, longitude: 0 }
      };
    case "UPDATE_DRAFT_LOCATION":
      return { ...state, draft: action.payload };
    case "DELETE_DRAFT":
      return { ...state, draft: null };
    case "ADD_PINS":
      return { ...state, pins: action.payload };
    case "ADD_PIN":
      return { ...state, pins: [...state.pins, action.payload] };
    case "SET_PIN":
      return { ...state, draft: null, currentPin: action.payload };
    case "REMOVE_PIN":
      return {
        ...state,
        currentPin: null,
        pins: state.pins.filter(pin => pin._id !== action.payload._id)
      };
    case "CREATE_COMMENT":
      return {
        ...state,
        currentPin: action.payload,
        pins: state.pins.map(pin =>
          pin._id === action.payload._id ? action.payload : pin
        )
      };
    default:
      return state;
  }
};
