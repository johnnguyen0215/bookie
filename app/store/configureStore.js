import { createStore, compose, applyMiddleware, dispatch } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import promiseMiddleware from 'api/promiseMiddleware';
import DevTools from 'components/DevTools'
import { routeLocationDidUpdate } from 'actions/routes';


/*
 * @param {Object} initial state to bootstrap our stores with for server-side rendering
 * @param {History Object} a history object. We use `createMemoryHistory` for server-side rendering,
 *                          while using browserHistory for client-side
 *                          rendering.
 */

const enhancer = compose(
  // Middleware you want to use in development:
  applyMiddleware(thunk, promiseMiddleware),
  // Required! Enable Redux DevTools with the monitors you chose
  DevTools.instrument()
);

export default function configureStore(initialState, history) {

  let devTools = [];
  if (typeof document !== 'undefined'){
    devTools = [ DevTools.instrument() ]
  }

  const middleware = [thunk, promiseMiddleware];

  const reactRouterReduxMiddleware = routerMiddleware(history);
  middleware.push(reactRouterReduxMiddleware);

  const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    ...devTools
    )
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      const nextReducer = require('reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
