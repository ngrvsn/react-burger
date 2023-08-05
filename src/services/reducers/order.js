import {GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, GET_ORDER_NUMBER} from '../actions/order';

const initialState = {
  order: null,
  orderNumber: null,
  orderRequest: false,
  orderFailed: false
};

export const orderReducer = (state = initialState, action) => {
  switch (action.type) {
      case GET_ORDER_REQUEST: {
          return {
              ...state,
              orderRequest: true
          };
      }
      case GET_ORDER_SUCCESS: {
          return {
              ...state,
              orderFailed: false,
              order: action.payload,
              orderRequest: false,
          };
      }
      case GET_ORDER_FAILED: {
          return {
              ...state,
              orderFailed: true,
              order: null,
              orderRequest: false,
          };
      }
      case GET_ORDER_NUMBER: {
        return {
          ...state,
          orderNumber: action.orderNumber,
        };
      }
      default: {
          return state;
      }
  }
};