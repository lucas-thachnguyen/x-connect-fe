import axios from 'axios';
import MockAdapter from "axios-mock-adapter";

const axiosClient = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL,
  headers: {
      'Content-Type': 'application/json',
      "Authorization": `Bearer ${localStorage.token}`
  }
});

// Add a request interceptor
axiosClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  },
);


let mock = new MockAdapter(axiosClient);
mock.onPost('/auth/sign-in').reply(200, {
  token1: '123456',
  profile: {
    id: '_sdsadsdasdEWI3281UWUSCNcsiauwuwyW',
    name: 'Ryan Dee',
    email: 'dcminh.se@gmail.com',
    country: 'vie'
  }
});

mock.onPost('/auth/sign-up').reply(200, {
  token1: '123456',
  profile: {
    id: '_sdsadsdasdEWI3281UWUSCNcsiauwuwyW',
    name: 'Ryan Dee',
    email: 'dcminh.se@gmail.com',
    country: 'vie'
  }
});

export default axiosClient;
