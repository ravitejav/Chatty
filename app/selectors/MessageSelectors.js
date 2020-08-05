import {pathOr} from 'ramda';
import {userDetails} from './AuthSelectors';
import {messagesPath} from '../services/Transformer';

export const currentContactSelector = (state, ownProps) => {
  return pathOr({}, ['messages', 'currentContact'], state);
};

export const messageSelector = (state, ownProps) => {
  const currentContact = currentContactSelector(state, ownProps);
  const user = userDetails(state, ownProps).userDetails;
  const messagePath = messagesPath(user.email, currentContact.emailId);
  return pathOr([], ['messages', 'userMessages', messagePath], state);
};

export const allMessageSelector = (state, ownProps) => {
  return pathOr(undefined, ['messages', 'userMessages'], state);
};
