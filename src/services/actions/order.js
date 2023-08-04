import { orderRequest } from '../authoris-api';
import { setBurgerIngredientsList } from './ingredient-list';

export const GET_ORDER_REQUEST = 'GET_ORDER_REQUEST';
export const GET_ORDER_SUCCESS = 'GET_ORDER_SUCCESS';
export const GET_ORDER_FAILED = 'GET_ORDER_FAILED';
export const GET_ORDER_NUMBER = 'GET_ORDER_NUMBER';

export const getOrder = (idItem) => async (dispatch) => {
    dispatch({
        type: GET_ORDER_REQUEST
    });
    try {
        const response = await orderRequest(idItem);
        if (response.success) {
            dispatch({
                type: GET_ORDER_SUCCESS,
                payload: response.order
            });
            dispatch(setBurgerIngredientsList([]));
        } else {
            dispatch({
                type: GET_ORDER_FAILED
            });
        }
        return response;
    } catch (error) {
        dispatch({
            type: GET_ORDER_FAILED
        });
    }
};

export const cancelOrder = () => ({
    type: GET_ORDER_SUCCESS,
});


export const saveOrderNumber = (orderNumber) => {
    return {
      type: GET_ORDER_NUMBER,
      orderNumber,
    };
  };