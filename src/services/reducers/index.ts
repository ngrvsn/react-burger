import { combineReducers } from 'redux';
import { ingredientsReducer } from './ingredients';
import { ingredientListReducer } from './ingredient-list';
import { modalItemReducer } from './modal-item';
import { userReducer } from './users';
import { orderReducer } from './order';
import { WebSocketUserReducer } from './orders-user';
import { WebSocketReducer } from './orders-all';


export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  user: userReducer,
  burgerConstructor: ingredientListReducer,
  modalItem: modalItemReducer,
  order: orderReducer,
  orderTracking: WebSocketReducer,
  orderTrackingUser: WebSocketUserReducer,

});

