import {GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED,   UPDATE_ORDER} from '../constants/order';
import { TOrderProps, TOrdersSectionProps } from '../../utils/types';
import { TOrderAction } from '../actions/order';

export type TOrderState = {
    order?: TOrderProps | null
    orderRequest: boolean
    orderFailed: boolean
    updatedOrder: TOrdersSectionProps | null}

const initialState:TOrderState = {
  order: null,
  orderRequest: false,
  orderFailed: false,
  updatedOrder: null}

export const orderReducer = (state = initialState, action: TOrderAction) => {
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
              order: action.payload,
              orderRequest: false,
              orderFailed: false,
          };
      }
      case GET_ORDER_FAILED: {
          return {
              ...state,
              order: null,
              orderRequest: false,
              orderFailed: true,
          };
      }

    
    case UPDATE_ORDER: {
        return {
            ...state,
            updatedOrder: action.payload,
        };
    }
 
      default: {
          return state;
      }
  }
};