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
function makeSearchRequest(method, api) {
  return request({
    url: api,
    method
  });
}

function beginSearch(){
	return {
		type: 'SEARCH_REQUEST',
		isFetching: true
	}
}

function searchSuccess(data){
	return{
		type: 'SEARCH_SUCCESS',
		isFetching: false,
		data: data
	}
}

function searchError(){
	return {
		type: 'SEARCH_ERROR',
		isFetching: false
	}
}

export function fullTextSearch(query, index){
	return dispatch => {
		let api = "https://www.googleapis.com/books/v1/volumes?q=" + query + "&startIndex=" + index + "&maxResults=10";
	  	dispatch(beginSearch());
	  	makeSearchRequest('get', api)
		.then(response => {
			if(response.status === 200){
		 		dispatch(searchSuccess(response.data));
			}
			else{
				dispatch(searchError());
			}
		})
		.catch(err => {
			dispatch(searchError());
		});
	};
}


	/*
	makeSearchRequest('get', gapi+data)
	.then(response => {
	  console.log(response);
	});*/
