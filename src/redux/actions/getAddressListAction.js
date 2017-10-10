import { getAddressList } from '@Api/getAddressList';
import { thunkHandler } from '@App/utils/helpers';
import * as types from './actionTypes';

export const getAddressListAction = () => thunkHandler({
  api: getAddressList,
  type: types.GET_ADDRESS_LIST
});
