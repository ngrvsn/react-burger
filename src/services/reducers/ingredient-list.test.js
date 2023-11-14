import { BURGER_INGREDIENTS_LIST } from '../constants/ingrerient-list';
import { ingredientListReducer } from './ingredient-list';

describe('ingredientlistreducer test', () => {
  it('should get initial state', () => {
    expect(ingredientListReducer(undefined, {})).toEqual({
      burgerIngredientsList: [],})
  })

  it('should get BURGER_INGREDIENTS_LIST', () => {
    const testdata = [{
      _id: 'string',
          name: 'string',
          type: 'string',
          proteins: 'number',
          fat: 'number',
          carbohydrates: 'number',
          calories: 'number',
          price: 'number',
          image: 'string',
          image_mobile: 'string',
          image_large: 'string',
          __v: 'number',}];

  expect(
      ingredientListReducer(undefined, {
      type: BURGER_INGREDIENTS_LIST,
      payload: testdata
    })


    ).toEqual({
        burgerIngredientsList: testdata
    })
  })
})