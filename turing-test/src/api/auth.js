import request from '../lib/request';

export const loginUser = (username, password) => {
  return request({
    url: 'auth/login',
    method: 'POST',
    data: {
      username: username,
      password: password,
    },
  });
};
