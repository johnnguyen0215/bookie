/**
 * Created by john_nguyen on 5/29/16.
 */

import { polyfill } from 'es6-promise';
polyfill();

export function routeLocationDidUpdate(location){
    return {
        type: 'ROUTE_CHANGE',
        location,
        message: 'route changed'
    }
}
