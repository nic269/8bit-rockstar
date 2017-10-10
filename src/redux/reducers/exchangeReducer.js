import * as type from '@Action/actionTypes';

const initialState = {
  exchangeData: {},
};

function exchangeReducer(state = initialState, action) {
  switch (action.type) {
    case type.GET_RATES.REQUEST:
      return {
        ...state,
        getRatesRequest: true,
        getGaragesFail: null,
        exchangeData: {}
      };
    case type.GET_RATES.SUCCESS:
      return {
        ...state,
        getRatesRequest: false,
        exchangeData: action.data,
      };
    case type.GET_RATES.FAILURE:
      return {
        ...state,
        getRatesRequest: false,
        getRatesFail: action.error,
      };
    default:
      return state;
  }
}

export default exchangeReducer;
