import { combineReducers } from 'redux';
import { boardReducer } from './boards';
import { constructorItemsReducer }  from './items-constructor'
import { menuReducer } from './menu';
import { orderReducer } from './order';


export const rootReducer = combineReducers({
  orders: orderReducer,
  ingredients: menuReducer,
  boardList: boardReducer,
  constructorItemsList: constructorItemsReducer,
});