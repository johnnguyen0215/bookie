export default function search(state = {
  data:[],
  message: ''}, action = {}) {
  switch(action.type){
    case 'SEARCH_SUBMIT':
      return Object.assign({}, state,{
        message: 'Search submit'
      });
    case 'SEARCH_REQUEST':
      return Object.assign({}, state, {
        message: 'Search begin'
      });
    case 'SEARCH_SUCCESS':
      return Object.assign({}, state, {
        data: action.data,
        message: 'Search success'
      });
    case 'SEARCH_FAILURE':
      return Object.assign({}, state, {
        data: action.res.data,
        message: 'Search failed'
      });
    default:
      return state;
  }
}
