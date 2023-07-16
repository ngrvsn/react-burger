import { UPDATE_INGREDIENT_COUNT, REMOVE_INGREDIENT_FROM_CONSTRUCTOR, UPDATE_BURGER_CONSTRUCTOR } from '../actions/burgerConstructor';

const initialState = {
  buns: {},
  ingredients: {},
};

function updateIngredientsCount(state, ingredientId, increment) {
  return {
    ...state,
    ingredients: {
      ...state.ingredients,
      [ingredientId]: (state.ingredients[ingredientId] || 0) + (increment ? 1 : -1),
    },
  };
}

export function burgerConstructorReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_INGREDIENT_COUNT:
      const { ingredientId, count } = action.payload;
      return updateIngredientsCount(state, ingredientId, count > 0);
    case REMOVE_INGREDIENT_FROM_CONSTRUCTOR:
      const ingredientToRemove = action.payload;
      const ingredientsCopy = { ...state.ingredients };
      delete ingredientsCopy[ingredientToRemove._id];
      return {
        ...state,
        ingredients: ingredientsCopy,
      };
    case UPDATE_BURGER_CONSTRUCTOR:
      return {
        ...state,
        ingredients: action.payload,
      };
    default:
      return state;
  }
}
