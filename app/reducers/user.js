export default function user(state = {
  isLogin: true,
  message: '',
  isWaiting: false,
  authenticated: false }, action = {}) {
  switch(action.type){
    case 'SIGNUP_USER':
      return Object.assign({}, state, {
        isWaiting: true,
        message: ''
      });
    case 'SIGNUP_SUCCESS_USER':
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true,
        message: action.message
      });
    case 'SIGNUP_ERROR_USER':
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: false,
        message: action.message
      });
    case 'LOGIN_USER':
      return Object.assign({}, state, {
        isWaiting: true,
        message: ''
      });
    case 'LOGIN_SUCCESS_USER':
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true,
        message: action.message
      });
    case 'LOGIN_ERROR_USER':
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: false,
        message: action.message
      });
    case 'LOGOUT_USER':
      return Object.assign({}, state, {
        isWaiting: true,
        message: ''
      });
    case 'LOGOUT_SUCCESS_USER':
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: false
      });
    case 'LOGOUT_ERROR_USER':
      return Object.assign({}, state, {
        isWaiting: false,
        authenticated: true,
        isLogin: true
      });
    default:
      return state;
  }
}