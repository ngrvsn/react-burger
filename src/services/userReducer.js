export const SET_AUTH = 'SET_AUTH';

const initialState = {
  isAuth: JSON.parse(localStorage.getItem('reduxState'))?.user?.isAuth || false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTH:
      return {
        ...state,
        isAuth: action.payload,
      };

    default:
      return state;
  }
};

export default userReducer;
