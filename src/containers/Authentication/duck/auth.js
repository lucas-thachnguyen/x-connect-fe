import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

/** 
 * Authentication action type
 * Chứa các hằng số 
 **/
export const AUTH_SIGN_UP_SUCCESS = "AUTH/SIGNUP_SUCCESS";
export const AUTH_SIGN_UP_FAIL = "AUTH/SIGNUP_FAIL";
export const AUTH_SIGN_IN_SUCCESS = "AUTH/SIGNIN_SUCCESS";
export const AUTH_SIGN_IN_FAIL = "AUTH/SIGNIN_FAIL";
export const AUTH_SIGN_OUT = "AUT/SIGNOUT";
export const AUTH_SET_REDIRECT_PATH = "AUT/SET_REDIRECT_PATH";
export const AUTH_CLEAN_UP_ERROR = "AUT/CLEAN_UP_ERROR";

// api
export const API_REQUEST_SIGN_UP = "AUT/API_REQUEST_SIGN_UP";
export const API_REQUEST_SIGN_IN = "AUT/API_REQUEST_SIGN_IN";
export const API_REQUEST_SIGN_OUT = "AUT/API_REQUEST_SIGN_OUT";


/** 
 * Action Creator
 * Các hàm này sẽ tạo ra các action cho reducer xử lý
 **/
export const signUpSuccessAction = (payload) => {
    return {
        type: AUTH_SIGN_UP_SUCCESS,
        payload
    }
}

// { message } = @payload
export const signUpFailAction = (payload) => {
    return {
        type: AUTH_SIGN_UP_FAIL,
        payload
    }
}

// { data } = @payload
export const signInSuccessAction = (response) => {
    return {
        type: AUTH_SIGN_IN_SUCCESS,
        payload: response
    }
}

// { message } = @payload
export const signInFailAction = (error) => {
    return {
        type: AUTH_SIGN_IN_FAIL,
        error
    }
}

// { message } = @payload
export const signOutAction = (payload) => {
    return {
        type: AUTH_SIGN_OUT,
        payload
    }
}

// { message } = @payload
export const cleanUpError = () => {
    return {
        type: AUTH_CLEAN_UP_ERROR,
    }
}

// { message } = @payload
export const startSignUpAction = (payload) => {
    return {
        type: API_REQUEST_SIGN_UP,
        payload
    }
}

// { message } = @payload
export const startSignInAction = (payload) => {
    return {
        type: API_REQUEST_SIGN_IN,
        payload
    }
}

// { message } = @payload
export const startSignOutAction = (payload) => {
    return {
        type: API_REQUEST_SIGN_OUT,
        payload
    }
}

/** 
 * Authentication Reducer
 *
 **/
const initialState = {
    isAuthenticated: false,
    isAuthenticating: false,
    token: null,
    profile: {
        name: 'guest'
    }
}

export const AuthReducer = function (state = initialState, action) {
    switch(action.type) {
        case AUTH_SIGN_UP_SUCCESS:  return onSignUpSuccess(state, action);
        case AUTH_SIGN_UP_FAIL:     return onSignUpFail(state, action);
        case AUTH_SIGN_IN_SUCCESS:  return onSignInSuccess(state, action);
        case AUTH_SIGN_IN_FAIL:     return onSignInFail(state, action);
        case AUTH_SIGN_OUT:         return onSignOut(state, action);
        case AUTH_CLEAN_UP_ERROR:   return onCleanUpErrors(state, action);
        case API_REQUEST_SIGN_IN:   return onAuthenticating(state, action);
        default: return state;
    }
}


/** 
 * Update state after sign-up successfully
 * action.payload = { token: <string>, profile: <object> }
 */
const onSignUpSuccess = (state, action) => {
    return {
        authErrors: null,
        isAuthenticated: true,
        isAuthenticating: false,
        token: action.payload.token,
        profile: action.payload.profile
    }
}

/** 
 * Update state after sign-up fail
 * action.payload = { common: <string> || <null> , fields: <object> }
 */
const onSignUpFail = (state, action) => {
    return {
        isAuthenticated: false,
        isAuthenticating: false,
        token: null,
        profile: null,
        authErrors: {
            common: action.payload.common || null,
            fields: action.payload.fields || {}
        },
    }
}


/** 
 * Update state after sign-in successfully
 * action.payload = { token: <string>, profile: <object> }
 */
const onSignInSuccess = (state, action) => {
    return {
        authErrors: null,
        isAuthenticated: true,
        isAuthenticating: false,
        token: action.payload.token,
        profile: action.payload.profile
    }
}


/** 
 * Update state after sign-in fail
 * action.payload = { token: <string>, profile: <object> }
 */
const onSignInFail = (state, action) => {
    return {
        isAuthenticated: false,
        isAuthenticating: false,
        token: null,
        profile: null,
        authErrors: {
            common: action.payload.common || null,
            fields: action.payload.fields || {}
        }
    }
}

/** 
 * Update state after sign out
 * action.payload = { token: <string>, profile: <object> }
 */
const onSignOut = (state, action) => {
    return {
        isAuthenticated: false,
        isAuthenticating: false,
        profile: null,
        token: null,
        authErrors: null
    }
}

/** 
 * Update state when sent Authentication requesting
 * 
 */
const onAuthenticating = (state, action) => {
    return {
        ...state,
        isAuthenticating: true
    }
}

const onCleanUpErrors = (state, action) => {
    return {
        ...state,
        authErrors: null
    }
}

export default persistReducer({
    key: 'user',
    storage: storage,
    blacklist: ['authErrors', 'isAuthenticating']
}, AuthReducer);
