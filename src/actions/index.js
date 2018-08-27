import * as types from '../constants/ActionTypes';

export function newTweet(tweet) {
  return { type: types.NEW_TWEET, tweet };
}

export function newData(data) {
  return { type: types.NEW_DATA, data };
}

export function error() {
  return { type: types.ERROR };
}
