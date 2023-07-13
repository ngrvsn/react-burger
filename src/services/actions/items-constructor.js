import { v4 as uuid } from 'uuid';

export const SORT_ITEMS_CONSTRUCTOR = 'SORT_ITEMS_CONSTRUCTOR';
export const DELETE_ITEMS_CONSTRUCTOR = 'DELETE_ITEMS_CONSTRUCTOR';
export const ADD_ITEMS_CONSTRUCTOR = 'ADD_ITEMS_CONSTRUCTOR';

export function addItemConstructor(item) {
  const newItem = {
    ...item,
    id: uuid(),
  };

  return {
    type: ADD_ITEMS_CONSTRUCTOR,
    payload: newItem,
  };
}

export function deleteConstructorItem(index) {
  return {
    type: DELETE_ITEMS_CONSTRUCTOR,
    payload: index,
  };
}

export function sortConstructorItems(from, to) {
  return {
    type: SORT_ITEMS_CONSTRUCTOR,
    payload: { from, to },
  };
}
