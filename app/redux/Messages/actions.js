import {messageTypes} from './types';

export const setCurentContact = (contact) => ({
  type: messageTypes.SET_CURRENT_CONTACT,
  payload: {contact},
});

export const removeCurrentContact = () => ({
  type: messageTypes.REMOVE_CURRENT_CONTACT,
  payload: {},
});
