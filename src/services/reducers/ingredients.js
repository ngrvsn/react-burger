// reducers/items-constructor.js
import { UPDATE_INGREDIENT_COUNT } from '../actions/items-constructor';

const initialState = {
  constructorItems: [],
};

export const constructorItemsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_INGREDIENT_COUNT: {
      const { constructorItems } = state;
      const { id, count } = action.payload;

      const updatedItems = constructorItems.map((item) => {
        if (item.id === id) {
          return { ...item, count };
        }
        return item;
      });

      return {
        ...state,
        constructorItems: updatedItems,
      };
    }
    // другие case для других экшенов...

    default:
      return state;
  }
};
