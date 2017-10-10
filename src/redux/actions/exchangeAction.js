import {
  getRates,
} from '@Api/exchange';
import * as types from './actionTypes';

const getRatesRequest = () => ({ type: types.GET_RATES.REQUEST });
const getRatesSuccess = data => ({ type: types.GET_RATES.SUCCESS, data });
const getRatesFail = error => ({ type: types.GET_RATES.FAILURE, error });

export const getRatesAction = params => (dispatch) => {
  dispatch(getRatesRequest());
  return getRates(params)
    .then(res => dispatch(getRatesSuccess(res)))
    .catch(error => dispatch(getRatesFail(error)));
};
