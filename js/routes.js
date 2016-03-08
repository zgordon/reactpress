import React from 'react';
import { Route, Router, Redirect, IndexRoute} from 'react-router';
import { createHashHistory } from 'history'
import { syncHistoryWithStore } from 'react-router-redux'

import ReactPress from './components/ReactPress';
import ViewContent from './components/ViewContent';



export default function Routes(store){
  const history = createHashHistory();
  syncHistoryWithStore(history, store);
  return (
    <Router history={history}>
      <Route path="/" component={ReactPress}>
        <IndexRoute component={ViewContent}/>
        <Route path="blog/:slug" component={ViewContent} />
        <Route path=":slug" component={ViewContent} />
      </Route>
    </Router>
  );
}
