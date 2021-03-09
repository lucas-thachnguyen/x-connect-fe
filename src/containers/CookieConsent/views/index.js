import React, { useEffect } from "react";
import Cookies from "js-cookie";
import classnames from "classnames";
import useAnimation from '../../../hooks/useAnimation';
import "./styles.scss";

const { NODE_ENV } = process.env;

function CookieConsent({
  cookieConsent: {
    consentAccepted,
    consentDenied,
    consentOpen,
    cookieName,
  } = {},
  setCookieConsentAccepted,
  setCookieConsentDenied,
  openCookieConsent,
}) {
  const [isVisible, isTransitioning] = useAnimation(consentOpen);

  const wrapperClasses = classnames({
    CookieConsent__Wrapper: true,
    [`CookieConsent__Wrapper--isVisible`]: isVisible,
    [`CookieConsent__Wrapper--isTransitioning`]: isTransitioning,
  });

  useEffect(() => {
    // 1. Kiểm tra cookie trước đã tồn tại hay không
    const cookie = Cookies.getJSON(cookieName);

    // 2. Nếu không tồn tại cookie nào, bật hộp thoại cookie consent
    if (!cookie && !consentOpen) {
      openCookieConsent();
    }


    // 3. Nếu có một cookie trước đó với consent là denied hoặc dismissed
    // gỡ bỏ cookie này vì `openCookieConsent()` đã được gọi kể xác nhận lại.
    if (
      consentOpen &&
      cookie &&
      cookie.consentDismissed &&
      cookie.consentDenied
    ) {
      Cookies.remove(cookieName);
    }

    /**
     * 4. If a cookie was found and the consent was denied, dismissed,
     * and the previous `consentDenied` was false,
     * set the cookie consent state in redux as denied.
     *
     * The Previous `consentDenied` check is to avoid calling twice `setCookieConsentDenied()`
     */
    if (
      !consentOpen &&
      cookie &&
      cookie.consentDismissed &&
      cookie.consentDenied &&
      !consentDenied
    ) {
      setCookieConsentDenied();
    }

    /**
     * 5. If a cookie was found and the consent was accepted, dismissed,
     * and the previous `consentAccepted` was false,
     * set the cookie consent state in redux as accepted.
     *
     * The previous `consentAccepted` check is to avoid calling twice `setCookieConsentAccepted()`
     */
    if (
      cookie &&
      cookie.consentDismissed &&
      cookie.consentAccepted &&
      !consentAccepted
    ) {
      setCookieConsentAccepted();
    }
  }, [
    consentAccepted,
    consentDenied,
    consentOpen,
    cookieName,
    openCookieConsent,
    setCookieConsentAccepted,
    setCookieConsentDenied,
  ]);

  function handleCookiesAccepted() {
    Cookies.set(
      cookieName,
      {
        consentAccepted: true,
        consentDenied: false,
        consentDismissed: true,
      },
      {
        expires: 780,
        domain: NODE_ENV === "development" ? "" : "todos.danilucaci.com",
        secure: NODE_ENV === "development" ? false : true,
      },
    );

    setCookieConsentAccepted();
  }

  function handleCookiesDenied() {
    Cookies.set(
      cookieName,
      {
        consentAccepted: false,
        consentDenied: true,
        consentDismissed: true,
      },
      {
        expires: 780,
        domain: NODE_ENV === "development" ? "" : "production.com",
        secure: NODE_ENV === "development" ? false : true,
      },
    );

    setCookieConsentDenied();
  }

  return (
    <aside className={wrapperClasses}>
      This website uses its own and third-party cookies to obtain statistics on
      the user's browsing habits, improve their experience and allow them to
      share content on social networks.{" "}
      <a
        href="https://www.danilucaci.com/cookie-policy"
        target="_blank"
        rel="nofollow noopener noreferrer"
      >
        Learn more
      </a>
      <div className="CookieConsent__Buttons__Wrapper">
        <button
          aria-label="Accept cookies"
          size="m"
          onClick={handleCookiesAccepted}
        >
          Accept
        </button>
        <button
          aria-label="Deny cookies"
          size="m"
          onClick={handleCookiesDenied}
        >
          Deny
        </button>
      </div>
    </aside>
  );
}

// CookieConsent.propTypes = {
//   cookieConsent: shape({
//     consentOpen: bool.isRequired,
//     consentAccepted: bool.isRequired,
//     consentDenied: bool.isRequired,
//     cookieName: string.isRequired,
//   }).isRequired,
//   setCookieConsentAccepted: func.isRequired,
//   setCookieConsentDenied: func.isRequired,
//   openCookieConsent: func.isRequired,
// };

export default CookieConsent;
