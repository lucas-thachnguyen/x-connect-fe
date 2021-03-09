import { createSelector } from "reselect";

export const selectCookieConsentState = (state) => state.cookieConsent;

export const CookieConsentActionTypes = {
    SET_COOKIE_CONSENT_ACCEPTED: 'COOKIE/SET_COOKIE_CONSENT_ACCEPTED',
    SET_COOKIE_CONSENT_DENIED: 'COOKIE/SET_COOKIE_CONSENT_DENIED',
    OPEN_COOKIE_CONSENT: "COOKIE/OPEN_COOKIE_CONSENT",
}

export const cookieConsentSelector = createSelector(
    [selectCookieConsentState],
    (state) => {
        return state
    }
);

/**
 * Action creator
 */
export const CookieConsentActionCreator = {
    setCookieConsentAccepted: () => {
        return {
            type: CookieConsentActionTypes.SET_COOKIE_CONSENT_ACCEPTED,
        }
    },
    setCookieConsentDenied: () => {
        return {
            type: CookieConsentActionTypes.SET_COOKIE_CONSENT_DENIED,
        }
    },
    openCookieConsent: () => {
        return {
            type: CookieConsentActionTypes.OPEN_COOKIE_CONSENT,
        }
    }
}

/**
 * Reducer
 */
const initialState = {
    consentAccepted: false,
    consentDenied: false,
    consentDismissed: false,
    consentOpen: true,
}

export const Reducer = function ( state = initialState, action) {
    switch(action.type) {
        case CookieConsentActionTypes.OPEN_COOKIE_CONSENT: 
            return openCookieConsent(state, action);
        case CookieConsentActionTypes.SET_COOKIE_CONSENT_ACCEPTED: 
            return setCookieConsentAccepted(state, action);
        case CookieConsentActionTypes.SET_COOKIE_CONSENT_DENIED: 
            return setCookieConsentDenied(state, action);            
        default: return state;
    }
}

export const openCookieConsent = function(state) {
    return {
        consentAccepted: false,
        consentDenied: false,
        consentDismissed: false,
        consentOpen: true,
      };
}

export const setCookieConsentAccepted = function(state) {
    return {
        consentAccepted: true,
        consentDenied: false,
        consentDismissed: true,
        consentOpen: false,
      }
}

export const setCookieConsentDenied = function(state) {
    return {
        consentAccepted: false,
        consentDenied: true,
        consentDismissed: true,
        consentOpen: false,
      }
}

export default Reducer;