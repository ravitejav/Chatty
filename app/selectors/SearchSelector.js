import {pathOr} from 'ramda';

export const searchContextSelector = (state, ownProps) => {
  return pathOr(null, ['dashboard', 'searchDetails', 'searchContext'], state);
};

export const contactSelector = (state, ownProps) => {};
