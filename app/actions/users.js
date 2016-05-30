import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';


polyfill();

/*
 * Utility function to make AJAX requests using isomorphic fetch.
 * You can also use jquery's $.ajax({}) if you do not want to use the
 * /fetch API.
 * @param Object Data you wish to pass to the server
 * @param String HTTP method, e.g. post, get, put, delete
 * @param String endpoint - defaults to /login
 * @return Promise
 */
function makeUserRequest(method, data, api = '/api/login') {
  return request({
    url: api,
    method,
    data,
    withCredentials: true
  });
}


// Log In Action Creators
function beginLogin() {
  return { type: 'MANUAL_LOGIN_USER'};
}

function loginSuccess(message) {
  return {
    type: 'LOGIN_SUCCESS_USER',
    message
  };
}

function loginError(message) {
  return {
    type: 'LOGIN_ERROR_USER',
    message
  };
}

// Sign Up Action Creators
function signUpError(message) {
  return {
    type: 'SIGNUP_ERROR_USER',
    message
  };
}

function beginSignUp() {
  return { type: 'SIGNUP_USER' };
}

function signUpSuccess(message) {
  return {
    type: 'SIGNUP_SUCCESS_USER',
    message
  };
}

// Log Out Action Creators
function beginLogout() {
  return { type: 'LOGOUT_USER'};
}

function logoutSuccess() {
  return { type: 'LOGOUT_SUCCESS_USER' };
}

function logoutError() {
  return { type: 'LOGOUT_ERROR_USER' };
}



export function manualLogin(data) {
  return dispatch => {
    dispatch(beginLogin());

    return makeUserRequest('post', data, '/api/login')
      .then(response => {
        if (response.status === 200) {
          dispatch(loginSuccess(response.data.message));
          dispatch(push('/'));
        } else {
          dispatch(loginError('Oops! Something went wrong!'));
        }
      })
      .catch(err => {
        dispatch(loginError(err.data.message));
      });
  };
}

export function signUp(data) {
  return dispatch => {
    dispatch(beginSignUp());
    return makeUserRequest('post', data, '/api/signup')
      .then(response => {
        if (response.status === 200) {
          dispatch(signUpSuccess(response.data.message));
          dispatch(push('/'));
        } else {
          dispatch(signUpError('Oops! Something went wrong'));
        }
      })
      .catch(err => {
        dispatch(signUpError(err.data.message));
      });
  };
}

export function logOut() {
  return dispatch => {
    dispatch(beginLogout());
    return makeUserRequest('post', null, '/api/logout')
      .then(response => {
        if (response.status === 200) {
          dispatch(logoutSuccess());
        } else {
          dispatch(logoutError());
        }
      });
  };
}
