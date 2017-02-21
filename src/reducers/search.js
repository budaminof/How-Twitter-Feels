import * as types from '../constants/ActionTypes';

const initialState = {
  tweets: [],
}

export default function search(state = initialState, action) {
  switch (action.type) {
    case types.NEW_TWEET:
      return {...state, tweets: [action.tweet, ...state.tweets]};
    case types.SEARCH_TERM:
      return {...state, tweets: []};
    default:
      return state;
  }
}
