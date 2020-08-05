import {messageTypes} from './types';

const initalState = {
  currentContact: undefined,
  userMessages: {},
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
    case messageTypes.ADD_MESSAGE:
      return {
        ...state,
        userMessages: {
          ...state.userMessages,
          [action.payload.messagePath]: {
            ...(state.userMessages[action.payload.messagePath] || {}),
            ...action.payload.message,
          },
        },
      };
    case messageTypes.RESET_MESSAGES:
      return {
        ...state,
        userMessages: {},
      };
    default:
      return state;
  }
};
