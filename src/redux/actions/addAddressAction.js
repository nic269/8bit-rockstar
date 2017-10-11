import { addAddress } from '@Api/addAddress';
import { thunkHandler } from '@App/utils/helpers';
import * as types from './actionTypes';

export const addAddressAction = address => thunkHandler({
  api: addAddress,
  type: types.ADD_ADDRESS,
  params: address
});
