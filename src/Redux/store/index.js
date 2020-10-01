import { combineReducers } from 'redux';
import bank from './reducers/bank';

export const AllReducers = combineReducers({
  bank,
});

const rootReducer = (state, action) => AllReducers(state, action);

export default rootReducer;
