import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, IndexRoute, Route, browserHistory } from 'react-router';
import createMuiTheme from 'material-ui/styles/createMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { syncHistoryWithStore } from 'react-router-redux';
import HomeContainer from '@Container/HomeContainer';
import AboutContainer from '@Container/AboutContainer';
import { PageNotFound } from '@Presentational';
import store from './redux/store';

import Application from './components/app';
import './styles/styles.scss';

const theme = createMuiTheme();
const history = syncHistoryWithStore(
  browserHistory,
  store
);

render(
  <MuiThemeProvider theme={theme}>
    <Provider store={store}>
      <Router history={history}>
        <Route path="/" component={Application}>
          <IndexRoute component={HomeContainer} />
          <Route path="about" component={AboutContainer} />
          <Route path="*" component={PageNotFound} />
        </Route>
      </Router>
    </Provider>
  </MuiThemeProvider>,
  document.querySelector('#root')
);
