import axios from 'axios';

import { baseUrl } from '../settings';

import { getRefreshToken, getAccessToken, setAccessTokens } from '../../src/lib/tokens';

const request = axios.create({
  baseURL: baseUrl,
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

request.defaults.baseURL = baseUrl;

request.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// response interceptors =================================================
let isRefreshing = false;
let refreshSubscribers = [];

const responseHandler = (response) => {
  console.debug('Request Successful!', response);

  if (Array.isArray(response.data)) {
    return { status: response.status, data: response.data };
  }

  return { status: response.status, ...response.data };
};

request.interceptors.response.use(
  (response) => {
    return responseHandler(response);
  },

  (error) => {
    const {
      config,
      response: { status }
    } = error;
    const originalRequest = config;

    if (status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        request
          .post('/auth/refresh-token', {
            refreshToken: getRefreshToken()
          })
          .then(({ data }) => {
            isRefreshing = false;
            const { accessToken, refreshToken } = data;
            setAccessTokens(accessToken, refreshToken);
          })
          .catch((e) => {
            window.location = '/';
          });
      }

      const retryOrigReq = new Promise((resolve, reject) => {
        subscribeTokenRefresh((accessToken) => {
          // replace the expired accessToken and retry
          originalRequest.headers['Authorization'] = 'Bearer ' + accessToken;
          resolve(request(originalRequest));
        });
      });
      return retryOrigReq;
    } else {
      return Promise.reject(error);
    }
  }
);

function subscribeTokenRefresh(cb) {
  refreshSubscribers.push(cb);
}

function onRrefreshed(accessToken) {
  refreshSubscribers.map((cb) => cb(accessToken));
}

export default request;
