import * as types from '../constants/ActionTypes';

const initialState = {
  tweets: [],
  showData: false,
  search: false,
}

export default function tweets(state = initialState, action) {
  switch (action.type) {
    case types.NEW_TWEET:
      return {...state,
        tweets: [action.tweet, ...state.tweets]
      };
    case types.SEARCH_TERM:
      return {...state,
        tweets: [],
        showData: false,
        search: true
      };
    case types.NEW_DATA:
      return {...state, showData: true};
    default:
      return state;
  }
}
