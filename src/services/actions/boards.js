export const ADD_BOARD = 'ADD_BOARD';

export const addBoard = (boardName) => {
  return {
    type: ADD_BOARD,
    boardName: boardName,
  };
};