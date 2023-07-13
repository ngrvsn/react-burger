import { ADD_BOARD } from '../actions/boards';


const initialState = {
  boards: ['bun', 'ingredients'],
};

export const boardReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOARD: {
      return {
        ...state,
        boards: [...state.boards, action.boardName],
      };
    }
    default: {
      return state;
    }
  }
};