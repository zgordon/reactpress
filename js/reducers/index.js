import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux'
import pages from './pages';
import menu from './menu';

const rootReducer = combineReducers({
  menu,
  pages,
  routing: routerReducer,
});

export default rootReducer;
