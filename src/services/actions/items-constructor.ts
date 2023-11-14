import { TIngredientProps } from '../../utils/types'; 

export const SORT_ITEMS_CONSTRUCTOR = 'SORT_ITEMS_CONSTRUCTOR';
export const DELETE_ITEMS_CONSTRUCTOR = 'DELETE_ITEMS_CONSTRUCTOR';
export const ADD_ITEMS_CONSTRUCTOR = 'ADD_ITEMS_CONSTRUCTOR';
export const UPDATE_INGREDIENT_COUNT = 'UPDATE_INGREDIENT_COUNT';

export interface IAddItemsConstructorAction {
  type: typeof ADD_ITEMS_CONSTRUCTOR;
  payload: TIngredientProps;
}

export interface IDeleteItemsConstructorAction {
  type: typeof DELETE_ITEMS_CONSTRUCTOR;
  payload: number;
}

export interface ISortItemsConstructorAction {
  type: typeof SORT_ITEMS_CONSTRUCTOR;
  payload: {
    from: number;
    to: number;
  };
}

export interface IUpdateIngredientCountAction {
  type: typeof UPDATE_INGREDIENT_COUNT;
  payload: {
    id: string;
    count: number;
  };
}

export type TConstructorActionTypes =
  | IAddItemsConstructorAction
  | IDeleteItemsConstructorAction
  | ISortItemsConstructorAction
  | IUpdateIngredientCountAction;

function generateRandomId(): string {
  return Math.random().toString(36).substr(2, 99);
}

export function addItemConstructor(item: TIngredientProps): IAddItemsConstructorAction {
  const newItem: TIngredientProps = {
    ...item,
    id: generateRandomId(),
  };

  return {
    type: ADD_ITEMS_CONSTRUCTOR,
    payload: newItem,
  };
}

export function deleteConstructorItem(index: number): IDeleteItemsConstructorAction {
  return {
    type: DELETE_ITEMS_CONSTRUCTOR,
    payload: index,
  };
}

export function sortConstructorItems(from: number, to: number): ISortItemsConstructorAction {
  return {
    type: SORT_ITEMS_CONSTRUCTOR,
    payload: { from, to },
  };
}

export function updateIngredientCount(id: string, count: number): IUpdateIngredientCountAction {
  return {
    type: UPDATE_INGREDIENT_COUNT,
    payload: { id, count },
  };
}
