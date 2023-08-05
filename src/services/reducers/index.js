import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { ingredientListReducer } from './ingredient-list';
import { modalItemReducer } from './modal-item';
import { userReducer } from './users';
import { orderReducer } from './order';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  burgerConstructor: ingredientListReducer,
  modalItem: modalItemReducer,
  order: orderReducer
});