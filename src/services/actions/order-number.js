import { generalRequest } from "../authoris-api";


export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_NUMBER = 'GET_ORDER_NUMBER';
export const GET_ORDER_PRICE = 'GET_ORDER_PRICE';
export const UPDATE_ORDERS = 'UPDATE_ORDERS';

export const saveOrderNumber = (number) => {
  return {
    type: GET_ORDER_NUMBER,
    number,
  };
};

export const loadOrder = (orderData) => async (dispatch) => {
    dispatch({ type: GET_ORDER_REQUEST });
  
    try {
      const response = await generalRequest('orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ingredients: [...orderData],
        }),
      });
  
      dispatch({
        type: GET_ORDER_SUCCESS,
        orders: response.order,
      });
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_ORDER_FAILED });
    }
  };