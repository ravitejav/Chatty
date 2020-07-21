import {AuthTypes} from './type';

const initalState = {loginStatus: false};

export const authReducer = function (state = initalState, action) {
  switch (action.type) {
    case AuthTypes.LOGGED_IN:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          ...action.payload,
        },
      };
    case AuthTypes.AUTH_DETAILS:
      return {
        ...state,
        authDetails: {
          ...state.authDetails,
          ...action.payload,
        },
      };
    case AuthTypes.LOADER:
      return {
        ...state,
        loader: action.payload.loader,
      };
    case AuthTypes.SIGNUP_DETAILS:
      return {
        ...state,
        signUpDetails: {
          ...state.signUpDetails,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};
