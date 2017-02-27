import { combineReducers } from 'redux';
import data from '../reducers/data';
import tweets from '../reducers/tweets';

const rootReducer = combineReducers({
    data,
    tweets
});

export default rootReducer;
