/**
 * Created by john_nguyen on 5/29/16.
 */

import { polyfill } from 'es6-promise';
polyfill();

export function routeLocationDidUpdate(location){
    window.console.log(location);
}