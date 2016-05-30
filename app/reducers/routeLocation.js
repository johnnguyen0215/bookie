/**
 * Created by john_nguyen on 5/29/16.
 */

export default function routeLocation(state = {
    location: '',
    message: ''
    }, action = {}) {
    switch(action.type){
        case 'ROUTE_CHANGE':
            return Object.assign({}, state, {
                location: action.location,
                message: 'route changed'
            });
        default:
            return state;
    }
}