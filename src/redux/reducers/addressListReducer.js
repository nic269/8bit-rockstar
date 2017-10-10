import * as type from '@Action/actionTypes';

const initialState = {
  addressList: []
};

function addressListReducer(state = initialState, action) {
  switch (action.type) {
    case type.GET_ADDRESS_LIST.REQUEST:
      return {
        ...state,
        getAddressListRequest: true,
        getAddressListFail: null,
        addressList: []
      };
    case type.GET_ADDRESS_LIST.SUCCESS:
      return {
        ...state,
        getAddressListRequest: false,
        addressList: action.data,
      };
    case type.GET_ADDRESS_LIST.FAILURE:
      return {
        ...state,
        getAddressListRequest: false,
        getAddressListFail: action.error,
      };
    case type.ADD_ADDRESS.REQUEST:
      return {
        ...state,
        addAddressInProgress: true,
        addAddressFail: false,
        addAddressSuccess: false
      };
    case type.ADD_ADDRESS.SUCCESS:
      return {
        ...state,
        addAddressInProgress: false,
        addAddressSuccess: true
      };
    case type.ADD_ADDRESS.FAILURE:
      return {
        ...state,
        addAddressInProgress: false,
        addAddressFail: action.error,
      };
    case type.ADDRESS_ADDED:
      return {
        ...state,
        addressList: [
          ...state.addressList,
          action.addressAdded
        ]
      };
    default:
      return state;
  }
}

export default addressListReducer;
