import axios from 'axios';
import * as configs from './authConfig';
import MockAdapter from "axios-mock-adapter";

const authAxios = axios.create({
  baseURL: configs.AUTH_BASE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Add a request interceptor
authAxios.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error.response.data);
  },
);

// Add a response interceptor
authAxios.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error.response.data);
  },
);

let mock = new MockAdapter(authAxios);
mock.onPost('/auth/sign-in').reply(200, {
  token: '123456',
  profile: {
    id: '_sdsadsdasdEWI3281UWUSCNcsiauwuwyW',
    name: 'Ryan Dee',
    email: 'dcminh.se@gmail.com',
    country: 'vie'
  }
});

mock.onPost('/auth/sign-up').reply(200, {
  token: '123456',
  profile: {
    id: '_sdsadsdasdEWI3281UWUSCNcsiauwuwyW',
    name: 'Ryan Dee',
    email: 'dcminh.se@gmail.com',
    country: 'vie'
  }
});

// mock.onPost('/auth/sign-up').reply(404, {
//   common: null,
//   fields: {
//     name: 'Họ tên không được trùng với Minh',
//     email: 'Email đã tồn tại',
//     not_a_key: 'Message này sẽ không hiện'
//   }
// });

export default authAxios;
