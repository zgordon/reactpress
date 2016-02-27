import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import pages from './pages';

const rootReducer = combineReducers({
  pages,
  routing: routerReducer,
});

export default rootReducer;
