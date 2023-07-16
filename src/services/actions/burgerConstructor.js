export const UPDATE_INGREDIENT_COUNT = 'UPDATE_INGREDIENT_COUNT';
export const REMOVE_INGREDIENT_FROM_CONSTRUCTOR = 'REMOVE_INGREDIENT_FROM_CONSTRUCTOR';
export const UPDATE_BURGER_CONSTRUCTOR = 'UPDATE_BURGER_CONSTRUCTOR';

export const updateIngredientCount = (ingredientId, count) => ({
  type: UPDATE_INGREDIENT_COUNT,
  payload: { ingredientId, count },
});

export const removeIngredientFromConstructor = (ingredient) => ({
  type: REMOVE_INGREDIENT_FROM_CONSTRUCTOR,
  payload: ingredient,
});

export const updateBurgerConstructor = (ingredients) => ({
  type: UPDATE_BURGER_CONSTRUCTOR,
  payload: ingredients,
});
