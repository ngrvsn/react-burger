import { store } from '../index';
import type { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { TBurgerIngredientsActions } from '../services/actions/ingredient-list';
import { TModalAction } from '../services/actions/modal-item';
import { TIngredientsAction } from '../services/actions/ingredients';
import { TOrderAction } from '../services/actions/order';
import { TUsersAction } from '../services/actions/users';
import { TWebSocketActions } from '../services/actions/orders-all';
import { TWebSocketActionsUser } from '../services/actions/orders-user';

import {TypedUseSelectorHook, useDispatch as dispatchHook, useSelector as selectorHook} from 'react-redux';



export type RootState = ReturnType<typeof store.getState>;
export type TApplicationActions = TBurgerIngredientsActions | TModalAction | TIngredientsAction | TOrderAction | TUsersAction | TWebSocketActions | TWebSocketActionsUser;
export type AppDispatch = ThunkDispatch<RootState, unknown, TApplicationActions>;
export type AppThunkAction<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, TApplicationActions>;

export const useDispatch = () => dispatchHook<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export type TUser = {
    email: string;
    name: string;
    password?: string;
};


export type TIngredient = {
    ingredientList: TIngredientProps[];
    ingredientListRequest: boolean;
    ingredientListFailed: boolean;
};

export type TIngredientProps = {
    
    _id: string;
    id: string;
    name: string;
    type: string;
    price: number;
    calories: number;
    proteins: number;
    fat: number;
    carbohydrates: number;
    image_large: string;
    dateValue?: number;
    isLocked?: string;
    image?: string;
    
    
};

export type TBurgerIngredient = {
    burgerIngredientsList: TIngredientProps[];
};

export type TModal = {
    modalIngredient: TIngredientProps[];
};


export type TOrder = {
    order: TOrderProps;
    orderRequest: boolean;
    orderFailed: boolean;
};


export type TOrderProps = {
    ingredients: TIngredientProps[];
    name: string;
    number: number;
    price: number;
    status: string;
    createdAt: string;
    _id: string;
    orderId: number;
};



export type TOrdersSectionProps = {
    ingredients: string[];
    number: number;
    name: string;
    status: string;
    createdAt: string 
    _id: string;
    price: number;
    updatedAt: string;
}

