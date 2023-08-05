import {MODAL_INGREDIENT, MODAL_DELETE_INGREDIENT} from '../actions/modal-item';

const initialState = {
    modalIngredient: null,
};

export const modalItemReducer = (state = initialState, action) => {
    switch (action.type) {
        case MODAL_INGREDIENT: {
            return {
                ...state,
                modalIngredient: action.payload
            };
        }
        case MODAL_DELETE_INGREDIENT: {
            return {
              ...state,
              modalIngredient: null,
            };
        }
        default: {
            return state;
        }
    }
};