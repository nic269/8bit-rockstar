import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import HomeContainer from '@Container/HomeContainer';
import AboutContainer from '@Container/AboutContainer';
import { PageNotFound } from '@Presentational';
import store from './redux/store';

import Application from './components/app';
import './styles/styles.scss';

render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={Application}>
        <IndexRoute component={HomeContainer} />
        <Route path="about" component={AboutContainer} />
        <Route path="*" component={PageNotFound} />
      </Route>
    </Router>
  </Provider>,
  document.querySelector('#root')
);
