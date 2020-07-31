import {messageTypes} from './types';

export const setCurentContact = (contact) => ({
  type: messageTypes.SET_CURRENT_CONTACT,
  payload: {contact},
});

export const removeCurrentContact = () => ({
  type: messageTypes.REMOVE_CURRENT_CONTACT,
  payload: {},
});

export const addMessage = (messagePath, messagePayload) => ({
  type: messageTypes.ADD_MESSAGE,
  payload: {
    messagePath,
    message: messagePayload,
  },
});

export const resetMessages = () => ({
  type: messageTypes.RESET_MESSAGES,
});
