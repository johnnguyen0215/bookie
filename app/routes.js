import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from 'containers/App';
import Home from 'containers/Home';
import Signup from 'containers/Signup';
import Login from 'containers/Login';
import Cart from 'containers/Cart';
import Search from 'containers/Search';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/'
      });
    }
    callback();
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Home}></IndexRoute>
      <Route path="cart" component={Cart} onEnter={requireAuth}></Route>
      <Route path="signup" component={Signup} onEnter={redirectAuth}></Route>
      <Route path="login" component={Login} onEnter={redirectAuth}></Route>
      <Route path="search" component={Search} onEnter={requireAuth}></Route>
    </Route>
  );
};
