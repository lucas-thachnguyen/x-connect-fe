/**
 * i18n.js
 * This will setup the i18n language files and locale data for your app.
 */

import i18next from "i18next";
import LanguageDetector from "i18next-browser-languagedetector"
import {initReactI18next} from 'react-i18next'
import XHR from 'i18next-xhr-backend'

import common_en from "./en/common.json";
import auth_en from "./en/auth.json";
import common_vi from "./vi/common.json";
import auth_vi from "./vi/auth.json";

export const DEFAULT_LOCALE = 'vi';

// prettier-ignore
export const appLocales = ['vi', 'en'];

i18next
.use(XHR)
.use(LanguageDetector)
.use(initReactI18next)
.init({
  interpolation: { escapeValue: false },  
  lng: DEFAULT_LOCALE,                              
  resources: {
      en: { 
        common: common_en,
        auth: auth_en
      },
      vi: { 
        common: common_vi,
        auth: auth_vi
      },
  },
  fallbackLng: "vi",
  debug: true,
  react: {
    wait: true,
    bindI18n: 'languageChanged loaded',
    bindStore: 'added removed',
    nsMode: 'default'
}
});

export default i18next;


/** 
 * Có 4 cách sử dụng
 * 
 * 1. Sử dụng HOC
 * import { withTranslation } from 'react-i18next'
 * export default withTranslation()(App);
 * 
 * 2. Sử dụng Render Props
 * import { Translation } from 'react-i18next';
 * <Translation>
 *    {t => <h1>{t('Welcome to React')}</h1>}
 * </Translation>
 * 
 * 3. Sử dụng Hooks
 * import { useTranslation } from 'react-i18next';
 * Usage:
 * const { t, i18n } = useTranslation();
 * return <h1>{t('Welcome to React')}</h1>
 * 
 * 4. Sử dụng Trans Component ()
 * import { Trans } from 'react-i18next';
 * return (<Trans><H1>Welcome to React</H1></Trans>)
 * 
 * npm install --global serve
 * npm run build
 * serve -s build
 **/
