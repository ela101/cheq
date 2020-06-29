import axios from 'axios';
import _ from 'lodash';

export default ({
  endpoint = '/api',
  path = '/',
  method = 'GET',
  body,
}) => {
  const url = `${endpoint}${path}`;
  let requestObject = {};

  if (_.includes(url, '?')) {
    requestObject = {
      method,
      url,
      headers: { Accept: 'application/xml' },
    };
  } else {
    requestObject = {
      method,
      url,
      headers: { Accept: 'application/json' },
    };
  }


  if (body) {
    requestObject.headers['Content-Type'] = 'application/json;charset=UTF-8';
    requestObject.data = JSON.stringify(body);
  }

  return axios(requestObject);
};
