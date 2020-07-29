import {AuthTypes} from './type';

const initalState = {userDetails: {loggedIn: false, emailVerified: false}};

export const authReducer = function (state = initalState, action) {
  switch (action.type) {
    case AuthTypes.LOGGED_IN:
      return {
        ...state,
        userDetails: {
          ...state.userDetails,
          ...action.payload,
          userDetails: {
            ...state.userDetails.userDetails,
            ...action.payload.userDetails,
          },
        },
      };
    case AuthTypes.LOGGED_OUT:
      return {
        ...state,
        userDetails: {},
        authDetails: {},
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
