import * as configs from './authConfig';
import authAxios from './authAxios';

const AuthService = function() {
    const ApiProvider = authAxios;
    const AUTH_COOKIE_NAME = configs.AUTH_COOKIE_NAME;
    const AUTH_TOKEN_NAME = configs.AUTH_TOKEN_NAME;
    /**
     * signUp function
     * @param {*} userPayload 
     * { name, email, password, other }
     */
    this.signUp = (payload) => {
        let user = {
            name: payload.name,
            email: payload.email,
            password: payload.password,
        }
        return ApiProvider.post(configs.ROUTES.API_SIGN_UP_PATH, user);
    }

    /**
     * signIn function
     * @param {*} userPayload 
     * { username, password }
     */
    this.signIn = (payload) => {
        let user = {
            email: payload.email,
            password: payload.password,
        }        
        return ApiProvider
            .post(configs.ROUTES.API_SIGN_IN_PATH, user)
            .then((response) => {
                if (response[AUTH_TOKEN_NAME]) {
                    localStorage.setItem(AUTH_COOKIE_NAME, JSON.stringify(response));
                    localStorage.setItem(AUTH_TOKEN_NAME, response[AUTH_TOKEN_NAME]);
                }
                return response;
            })
    }

    /**
     * Sign Out
     */
    this.signOut = () => {
        return ApiProvider
            .post(configs.ROUTES.API_SIGN_OUT_PATH)
            .then((response) => {
                localStorage.removeItem(AUTH_COOKIE_NAME);
                localStorage.removeItem(AUTH_TOKEN_NAME);
                return response;
            })
    }
}

export default new AuthService();