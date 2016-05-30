import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import rootReducer from 'reducers';
import promiseMiddleware from 'api/promiseMiddleware';
import DevTools from 'components/DevTools'

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
  // Installs hooks that always keep react-router and redux
  // store in sync
  history.addChangeListener(() => store.dispatch(routeLocationDidUpdate(location)));
  const reactRouterReduxMiddleware = routerMiddleware(history);
  if (__DEVCLIENT__) {
    middleware.push(reactRouterReduxMiddleware);
  } else {
    middleware.push(reactRouterReduxMiddleware);
  }
  /*
  const finalCreateStore = applyMiddleware(...middleware)(createStore);

  const store = finalCreateStore(rootReducer, initialState);*/

  const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    ...devTools
    )
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('reducers', () => {
      const nextReducer = require('reducers');
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
