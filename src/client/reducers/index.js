import { combineReducers } from 'redux';
import vast from './vast';

const rootReducer = combineReducers({
  vast: vast,
});

export default rootReducer;
