import * as types from '../constants/ActionTypes';

const initialState = {
  tweets: [],
  showData: false,
  showWaiting: false,
  error: false
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
        showWaiting: true,
      };

    case types.NEW_DATA:
      return {...state,
        showData: true,
        showWaiting: false,
      };

    case types.ERROR:
      return {...state, error: true};

    default:
      return state;
  }
}
