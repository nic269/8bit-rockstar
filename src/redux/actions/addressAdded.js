import { watchAddressAdded } from '@Api/watchAddressAdded';
import * as types from './actionTypes';

const addressAddedAction = addressAdded => ({
  type: types.ADDRESS_ADDED,
  addressAdded
});

export const watchAddressAddedEvent = () => (dispatch) => {
  watchAddressAdded(dispatch, addressAddedAction);
};
