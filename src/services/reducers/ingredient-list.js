import { BURGER_INGREDIENTS_LIST} from '../actions/ingredient-list';

const initialState = {
    burgerIngredientsList: [],
};

export const ingredientListReducer = (state = initialState, action) => {
    switch (action.type) {
        case BURGER_INGREDIENTS_LIST: {
             return {
                ...state,
                burgerIngredientsList: action.payload
            }
        }
        default: {
            return state;
        }
    }
};
