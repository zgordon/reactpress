import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './configureStore';
import Routes from './routes.js'

window.onload = function () {
  const store = configureStore();
  const routes = new Routes(store);

  ReactDOM.render(
    <Provider store={store}>
      {routes}
    </Provider>,
    document.getElementById('reactpress')
  );
}
