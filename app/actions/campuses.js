import { polyfill } from 'es6-promise';
import request from 'axios';
import { push } from 'react-router-redux';
polyfill();

export function makeCampusRequest(method, query, api = '/api/campus'){
  return request[method](api+'?search='+query);
}

export function searchCampuses(query) {
  return{
    type: 'GET_CAMPUSES',
    promise: makeCampusRequest('get', query)
  };
}
