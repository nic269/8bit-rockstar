import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
} from 'redux';
import { routerReducer } from 'react-router-redux';
import thunk from 'redux-thunk';
import * as appReducers from './reducers';

const store = createStore(
  combineReducers({
    ...appReducers,
    routing: routerReducer
  }),
  compose(
    applyMiddleware(thunk),
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
