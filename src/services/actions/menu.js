import { generalRequest } from '../authoris-api';

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const MODAL_ADD_INGREDIENT = 'MODAL_ADD_INGREDIENT';
export const MODAL_DELETE_INGREDIENT = 'MODAL_DELETE_INGREDIENT';


export function getIngedients() {
  return function (dispatch) {
      dispatch({
          type: GET_INGREDIENTS_REQUEST
      });

      getIngedientsRequest()
          .then(response => {
              dispatch({
                  type: GET_INGREDIENTS_SUCCESS,
                  payload: response.data
              });
          })
          .catch(() => {
              dispatch({
                  type: GET_INGREDIENTS_FAILED
              });
          });
  };
}

export function loadIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    });
    generalRequest("ingredients")
      .then((res) => {
        if (res.success) {
          dispatch({
            type: GET_INGREDIENTS_SUCCESS,
            ingredients: res.data,
          });
        } else {
          dispatch({
            type: GET_INGREDIENTS_FAILED,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: GET_INGREDIENTS_FAILED,
        });
      });
  };
}



export const UPDATE_INGREDIENT_COUNT = 'UPDATE_INGREDIENT_COUNT';

export const updateIngredientCount = (ingredientId, count) => ({
  type: UPDATE_INGREDIENT_COUNT,
  payload: { ingredientId, count },
});

