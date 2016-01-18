import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { api } from './middleware';
import reducers from './reducers';

const createStoreWithMiddleware = applyMiddleware(
  thunk,
  api
)(createStore);

export default createStoreWithMiddleware(reducers, {});
