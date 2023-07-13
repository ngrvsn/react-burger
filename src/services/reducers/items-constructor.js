import { DELETE_ITEMS_CONSTRUCTOR, ADD_ITEMS_CONSTRUCTOR, SORT_ITEMS_CONSTRUCTOR } from '../actions/items-constructor';

const initialState = {
  constructorBun: [],
  constructorItems: [],
};

export const constructorItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case DELETE_ITEMS_CONSTRUCTOR: {
      const { constructorItems } = state;
      const updatedItems = constructorItems.filter(
        (_, index) => index !== action.payload
      );
      return {
        ...state,
        constructorItems: updatedItems,
      };
    }
    case ADD_ITEMS_CONSTRUCTOR: {
      const { constructorBun, constructorItems } = state;
      const newItem = action.payload;
  
      if (newItem.type === 'bun') {
        if (
          constructorBun.length > 0 &&
          constructorBun[0].name === newItem.name
        ) {
          return state;
        }
  
        return {
          ...state,
          constructorBun: [newItem],
        };
      } else {
        return {
          ...state,
          constructorItems: [...constructorItems, newItem],
        };
      }
    }
    case SORT_ITEMS_CONSTRUCTOR: {
      const { constructorItems } = state;
      const { from, to } = action.payload;
  
      const updatedItems = [...constructorItems];
      const [draggedItem] = updatedItems.splice(from, 1);
      updatedItems.splice(to, 0, draggedItem);
  
      return {
        ...state,
        constructorItems: updatedItems,
      };
    }
    default: {
      return state;
    }
  }
};
