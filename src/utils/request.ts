import axios from 'axios';

const request = axios.create({
  baseURL: 'https://cors-anywhere.herokuapp.com/https://api.smarkets.com/v3/',
  timeout: 60000,
});

request.interceptors.request.use(
  function (config) {
    // Do something before request is sent
    return config;
  },
  function (error) {
    // Do something with request error
    console.log('interceptors request error', error);
    return Promise.reject(error);
  },
);

request.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    console.log('interceptors response error', error);
    return Promise.reject(error);
  },
);

export default request;
