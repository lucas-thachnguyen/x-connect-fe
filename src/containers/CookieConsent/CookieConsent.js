import { connect } from "react-redux";
import CookieConsent from "./views";
import * as Store from './duck/store';

const mapStateToProps = (state) => {
    return {
        cookieConsent: Store.cookieConsentSelector(state),
      }
};

const mapDispatchToProps = (dispatch) => ({
  setCookieConsentAccepted: () => dispatch(Store.CookieConsentActionCreator.setCookieConsentAccepted()),
  setCookieConsentDenied: () => dispatch(Store.CookieConsentActionCreator.setCookieConsentDenied()),
  openCookieConsent: () => dispatch(Store.CookieConsentActionCreator.openCookieConsent()),
});

export default connect(mapStateToProps, mapDispatchToProps)(CookieConsent);
