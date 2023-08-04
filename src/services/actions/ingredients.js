import { getIngedientsRequest } from "../authoris-api";


export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';



export function getIngedients() {
    return async function (dispatch) {
        try {
            dispatch({
                type: GET_INGREDIENTS_REQUEST
            });

            const response = await getIngedientsRequest();
            console.log(response.data)
            dispatch({
                type: GET_INGREDIENTS_SUCCESS,
                payload: response.data
            });
        } catch (error) {
            dispatch({
                type: GET_INGREDIENTS_FAILED
            });
        }
    };
}