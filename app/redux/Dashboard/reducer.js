import {dashboardActions} from './types';

const initalState = {
  friendList: [],
};

export const dashboardReducer = function (state = initalState, action) {
  switch (action.type) {
    case dashboardActions.SEARCH_CONTEXT:
      return {
        ...state,
        searchDetails: {
          ...state.searchDetails,
          searchContext: action.payload.searchContext,
        },
      };
    case dashboardActions.ADD_FRIEND:
      return {
        ...state,
        friendList: [...state.friendList, action.payload.friend],
      };
    case dashboardActions.RESET_FRIEND_LIST:
      return {
        ...state,
        friendList: [],
      };
    default:
      return state;
  }
};
