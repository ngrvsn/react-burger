import { orderRequest } from '../authoris-api';
import { setBurgerIngredientsList } from './ingredient-list';
import { TOrderProps,  AppDispatch, AppThunkAction, TOrdersSectionProps } from '../../utils/types';
import { GET_ORDER_FAILED, GET_ORDER_NUMBER, GET_ORDER_REQUEST, GET_ORDER_SUCCESS,  UPDATE_ORDER, } from '../constants/order';
import { getCookie } from '../cookies';


type TOrderRequestAction = {
  type: typeof GET_ORDER_REQUEST};

type TOrderSuccessAction = {
  type: typeof GET_ORDER_SUCCESS;
  payload?: TOrderProps};

type TOrderFailedAction = {
  type: typeof GET_ORDER_FAILED};

type TUpdateOrderAction = {
  type: typeof UPDATE_ORDER;
  payload: TOrdersSectionProps | null};

export type TOrderAction = TOrderRequestAction | TOrderSuccessAction | TOrderFailedAction | TUpdateOrderAction;


export const getOrder = (idItem: string[]) => async (dispatch: AppDispatch) => {
    dispatch({
        type: GET_ORDER_REQUEST
    });

    const token = getCookie('token');
    console.log('Токен в getOrder:', token);

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
    } catch (error: unknown) {
        dispatch({
            type: GET_ORDER_FAILED
        });
    }
};

export const cancelOrder = ():TOrderSuccessAction => ({
    type: GET_ORDER_SUCCESS,
});




export const updateOrder = (item: TOrdersSectionProps | null):TUpdateOrderAction => ({
    type: UPDATE_ORDER,
    payload: item,
})

