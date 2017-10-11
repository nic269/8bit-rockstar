import { editAddress } from '@Api/editAddress';
import { thunkHandler } from '@App/utils/helpers';
import * as types from './actionTypes';

export const editAddressAction = (id, address) => thunkHandler({
  api: editAddress,
  type: types.EDIT_ADDRESS,
  params: {
    id,
    address
  }
});
