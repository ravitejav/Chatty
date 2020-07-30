import {messageTypes} from './types';

const initalState = {
  currentContact: undefined,
};

export const messageReducer = function (state = initalState, action) {
  switch (action.type) {
    case messageTypes.SET_CURRENT_CONTACT:
      return {
        ...state,
        currentContact: action.payload.contact,
      };
    case messageTypes.REMOVE_CURRENT_CONTACT:
      return {
        ...state,
        currentContact: undefined,
      };
    default:
      return state;
  }
};
