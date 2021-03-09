/**
 * Combine all reducers in this file and export the combined reducers.
 * Creates the main reducer with the dynamically injected ones.
 */

import { combineReducers } from 'redux';

import routeReducer from './route/routeReducer';
import userReducer from '../containers/Authentication/duck/auth';

// Start import application reducers here
import { Reducer as cookieConsent } from '../containers/CookieConsent/duck/store';
// End import

export default combineReducers({
  user: userReducer,
  route: routeReducer,
  cookieConsent,
});
