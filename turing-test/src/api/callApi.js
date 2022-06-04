import request from '../lib/request';

export const getAllCalls = () => {
  return request({
    url: '/calls',
    method: 'GET',
  });
};

export const getCallDetail = (id) => {
  return request({
    url: `/calls/${id}`,
    method: 'GET',
  });
};
