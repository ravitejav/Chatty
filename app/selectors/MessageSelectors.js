import {pathOr} from 'ramda';

export const currentContactSelector = (state, ownProps) => {
  return pathOr({}, ['messages', 'currentContact'], state);
};
