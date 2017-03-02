import { combineReducers } from 'redux';
import data from '../reducers/data';
import tweets from '../reducers/tweets';
import { reducer as formReducer } from 'redux-form';

const rootReducer = combineReducers({
    data,
    tweets,
    form: formReducer
});

export default rootReducer;
