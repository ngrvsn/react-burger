export type TUser = {
    email: string;
    name: string;
    password: string;
};

export type TAuthorisation = {
    user: TUser;
    registerStart: boolean;
    registerError: boolean;
    loginStart: boolean;
    loginError: boolean;
    logoutStart: boolean;
    logoutError: boolean;
    forgotPasswordStart: boolean;
    forgotPasswordError: boolean;
    resetPasswordStart: boolean;
    resetPasswordError: boolean;
    getUserStart: boolean;
    getUserError: boolean;
    getUserRequest: boolean;
    getUserSuccess: boolean;
    getUserFailed: boolean;
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
    modalIngredient: TIngredientProps;
};


export type TOrder = {
    order: TOrderProps;
    orderRequest: boolean;
    orderFailed: boolean;
};

export type TOrderProps = {
    ingredients: TIngredientProps[];
};
