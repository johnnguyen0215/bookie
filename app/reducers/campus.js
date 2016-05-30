export default function campus(state = {
  data:[],
  message: ''}, action = {}) {
  switch(action.type){
    case 'GET_CAMPUSES_REQUEST':
      console.log("campus request");
      return Object.assign({}, state, {
      });
    case 'GET_CAMPUSES_SUCCESS':
      return Object.assign({}, state, {
        data: action.req.data,
        message: 'Successfully retrieved campuses'
      });
    case 'GET_CAMPUSES_FAILURE':
      return Object.assign({}, state, {
        data: action.res.data,
        message: 'Failed to retrieve campuses'
      });
    default:
      return state;
  }
}