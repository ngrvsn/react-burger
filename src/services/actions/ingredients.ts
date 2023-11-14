import { getIngedientsRequest } from "../authoris-api";
import { TIngredientProps, AppDispatch, AppThunkAction } from "../../utils/types";
import { GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS, GET_INGREDIENTS_FAILED } from "../constants/ingredients";


type TIngredientsRequestAction = {
    type: typeof GET_INGREDIENTS_REQUEST};
  
  type TIngredientsSuccessAction = {
    type: typeof GET_INGREDIENTS_SUCCESS;
    payload: TIngredientProps[] };
  
  type TIngredientsFailedAction = {
    type: typeof GET_INGREDIENTS_FAILED};



export type TIngredientsAction = TIngredientsFailedAction | TIngredientsRequestAction | TIngredientsSuccessAction;



export function getIngredients():AppThunkAction {
    return async function (dispatch: AppDispatch) {
        try {
            dispatch({
                type: GET_INGREDIENTS_REQUEST
            });

            const response = await getIngedientsRequest();
            console.log(response.data)
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                payload: response.data || []
            });
        } catch (error: unknown) {
            dispatch({
                type: GET_INGREDIENTS_FAILED
            });
        }
    };
}