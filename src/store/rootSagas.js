/**
 * rootSata.js
 * Combine all saga in this file and export the combined saga.
 */

import { all, fork } from 'redux-saga/effects';
import * as authSagas from '../containers/Authentication/duck/saga';

// Start all sagas
export default function* rootSaga() {
  yield all(
    [
      ...Object.values(authSagas),
    ].map(fork)
  );
}
