import * as types from '../constants/ActionTypes';

export default function search(state = null, action) {
  switch (action.type) {
    case types.SEARCH_TERM:
      return action;
    default:
      return state;
  }
}
