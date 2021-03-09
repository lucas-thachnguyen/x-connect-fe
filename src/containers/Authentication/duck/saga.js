import {
    API_REQUEST_SIGN_UP,
    API_REQUEST_SIGN_IN,
    API_REQUEST_SIGN_OUT,
    signUpSuccessAction,
    signUpFailAction,
    signInSuccessAction,
    signInFailAction,
    signOutAction
} from "./auth";

import AuthService from "../authService";
import { put, takeLatest, call } from 'redux-saga/effects'

function* signUp(actions) {
    try {
        const response =  yield call(AuthService.signUp, actions.payload);
        yield put(signUpSuccessAction(response));
    } catch (err) {
        yield put(signUpFailAction(err));
    }
}

export function* signUpSaga() {
    yield takeLatest(API_REQUEST_SIGN_UP, signUp);
}

function* signIn(actions) {
    try {
        const response =  yield call(AuthService.signIn, actions.payload);
        yield put(signInSuccessAction(response));
    } catch (err) {
        yield put(signInFailAction(err));
    }
}

export function* signInSaga() {
    yield takeLatest(API_REQUEST_SIGN_IN, signIn);
}

function* signOut(actions) {
    try {
        yield call(AuthService.signOut, actions.payload);
        yield put(signOutAction());
    } catch (err) {
        yield put(signOutAction());
    }
}

export function* signOutSaga() {
    yield takeLatest(API_REQUEST_SIGN_OUT, signOut);
}
