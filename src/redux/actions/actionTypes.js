const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE].forEach((type) => { res[type] = `${base}_${type}`; });
  return res;
}
export const GET_ADDRESS_LIST = createRequestTypes('GET_ADDRESS_LIST');
export const ADD_ADDRESS = createRequestTypes('ADD_ADDRESS');
export const EDIT_ADDRESS = createRequestTypes('EDIT_ADDRESS');

export const ADDRESS_ADDED = 'ADDRESS_ADDED';
