import React from 'react';
import ReactDOM from 'react-dom';
// import { Provider } from 'react-redux';
// import configureStore from './configureStore';
// import Routes from './routes.js'
import {Router, Route, IndexRoute} from 'react-router';
import ReactPress from './components/ReactPress';
import ViewContent from './components/ViewContent';

window.onload = function () {
//   const store = configureStore();
//   const routes = new Routes(store);
//
//   ReactDOM.render(
//   <Provider store={store}>
//     {routes}
//   </Provider>,
//   document.getElementById('reactpress')
// );

ReactDOM.render(
  <Router >
    <Route path="/" component={ReactPress}>
      <IndexRoute component={ViewContent}/>
      <Route path="blog/:slug" component={ViewContent} />
      <Route path=":slug" component={ViewContent} />
    </Route>
  </Router>,
  document.getElementById('reactpress')
);


}
