import { GET_INGREDIENTS_FAILED, GET_INGREDIENTS_REQUEST, GET_INGREDIENTS_SUCCESS} from '../actions/ingredients';

const initialState = {
    ingredientList: [],
    ingredientListRequest: false,
    ingredientListFailed: false,
};

export const ingredientsReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_INGREDIENTS_REQUEST: {
            return {
                ...state,
                ingredientListRequest: true
            };
        }
        case GET_INGREDIENTS_SUCCESS: {
            return {
                ...state,
                ingredientListRequest: false,
                ingredientList: action.payload,
                ingredientListFailed: false

            };
        }
        case GET_INGREDIENTS_FAILED: {
            return {
                ...state,
                ingredientListFailed: true,
                ingredientListRequest: false,
                ingredientList: []
            };
        }
        default: {
            return state;
        }
    }
};
