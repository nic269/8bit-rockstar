import axios from 'axios';

export const parseJSON = (response) => {
  if (response.status === 201 || response.status === 204) {
    return new Promise((resolve) => {
      resolve({
        status: response.status,
        statusText: response.statusText,
        json: { message: 'OK' }
      });
    });
  }
  return new Promise((resolve) => {
    resolve({
      status: response.status,
      statusText: response.statusText,
      json: response.data
    });
  });
};

export const headers = () => ({
  Accept: 'application/json',
  'Content-Type': 'application/json'
});

export const request = (method, url, options) => new Promise((resolve, reject) => {
  axios({
    method,
    url,
    headers: headers(),
    withCredentials: true,
    ...options
  })
    .then(parseJSON)
    .then(response => resolve(response.json))
    .catch(error => reject(error));
});

const getTypes = (type, statuses = ['REQUEST', 'SUCCESS', 'FAILURE']) => statuses.map(item => type[item]);

export const thunkHandler = ({ api, params = {}, type = {} }) => (dispatch) => {
  const types = getTypes(type);
  if (types.length !== 3) {
    console.error('ERROR: types are not match'); // eslint-disable-line
  } else {
    dispatch(({
      type: types[0]
    }));
    return api({ ...params })
      .then(data => dispatch(({
        type: types[1],
        data
      })))
      .catch(error => dispatch(({
        type: types[2],
        error
      })));
  }
};
