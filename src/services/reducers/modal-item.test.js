import { MODAL_INGREDIENT } from '../constants/modal-item';
import { modalItemReducer } from './modal-item';

describe('modalitemreducer test', () => {
    it('should get initial state', () => {
        expect(modalItemReducer(undefined, {})).toEqual({modalIngredient: null})
    })

    it('should get MODAL_INGREDIENT', () => {
        const testdata = {
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
          __v: 'number',
        };
    
      expect(
          modalItemReducer(undefined, {
          type: MODAL_INGREDIENT,
          payload: testdata
        })
      )
      
      .toEqual({modalIngredient: testdata})
  })
})