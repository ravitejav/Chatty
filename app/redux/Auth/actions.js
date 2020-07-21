import {AuthTypes} from './type';

export const userLoggedIN = (changes) => {
  return {
    type: AuthTypes.LOGGED_IN,
    payload: changes,
  };
};

export const addLoginDetails = (changes) => {
  return {
    type: AuthTypes.AUTH_DETAILS,
    payload: changes,
  };
};

export const setLoader = (toggle) => {
  return {
    type: AuthTypes.LOADER,
    payload: {
      loader: toggle,
    },
  };
};

export const addSignUpDetails = changes => {
  return {
    type: AuthTypes.SIGNUP_DETAILS,
    payload: changes,
  };
};
