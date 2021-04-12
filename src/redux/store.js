import { applyMiddleware, combineReducers, createStore, compose } from "redux";
import production from './production';
import thunk from "redux-thunk";

const reducers = combineReducers({
  production,
  }
);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(thunk)
));

export default store;

