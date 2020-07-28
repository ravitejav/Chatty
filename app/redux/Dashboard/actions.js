import {dashboardActions} from './types';

export const setSearchContext = (searchContext) => ({
  type: dashboardActions.SEARCH_CONTEXT,
  payload: {searchContext},
});

export const addFriendToContactList = (friend) => ({
  type: dashboardActions.ADD_FRIEND,
  payload: {friend},
});

export const resetFriendList = () => ({
  type: dashboardActions.RESET_FRIEND_LIST,
  payload: {},
});
