import {pathOr} from 'ramda';

export const authDeatils = (state, ownprops) => {
  return pathOr({}, ['auth', 'authDetails'], state);
};

export const userDetails = (state, ownprops) => {
  return pathOr({}, ['auth', 'userDetails'], state);
};

export const loader = (state, ownprops) => {
  return pathOr(false, ['auth', 'loader'], state);
};

export const signUpDetails = (state, ownprops) => {
  return pathOr({}, ['auth', 'signUpDetails'], state);
};
