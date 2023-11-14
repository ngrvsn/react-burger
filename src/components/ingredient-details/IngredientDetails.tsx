import React, { useEffect, useState, FC } from 'react';
import { AppDispatch } from '../../utils/types';
import { useLocation } from 'react-router-dom';
import { setModalIngredient } from '../../services/actions/modal-item';
import { getIngredients } from '../../services/actions/ingredients';
import {  TIngredientProps, useSelector, useDispatch } from '../../utils/types';
import { TIngredientsState } from '../../services/reducers/ingredients';
import { TIngedientModalState } from '../../services/reducers/modal-item';

import styles from './IngredientDetails.module.css';

const IngredientDetails: FC = ( ) => {
  const dispatch: AppDispatch = useDispatch();
  const modalIngredient = useSelector((state: { modalItem: TIngedientModalState }) => state.modalItem.modalIngredient);
  const ingredientListFailed = useSelector((state: { ingredients: TIngredientsState }) => state.ingredients.ingredientListFailed);
  const ingredientListRequest = useSelector((state: { ingredients: TIngredientsState }) => state.ingredients.ingredientListRequest);
  const ingredientList = useSelector((state: { ingredients: TIngredientsState })=> state.ingredients.ingredientList);
  const location = useLocation();
  
 /* eslint-disable */
const [selectedIngredient, setSelectedIngredient] = useState<TIngredientProps | null>(null);
/* eslint-enable */


  
  useEffect((): ReturnType<React.EffectCallback> => {
    const fetchIngredientsList = async () => {
      if (!location.state) {
        await dispatch(getIngredients()); 
      }
    };
  
    fetchIngredientsList();
  }, [dispatch, location.state]);

  useEffect((): ReturnType<React.EffectCallback> => {
    const setModalIngredientAction = () => {
      if (!ingredientListRequest && !ingredientListFailed && ingredientList?.length) {
        const listId = location.pathname.split('/ingredients/')[1];
        const list = ingredientList.filter(item => item._id === listId);
        if (list.length > 0) {
          dispatch(setModalIngredient(list[0] as unknown as TIngredientProps)); 
          setSelectedIngredient(list[0]);
        }
      }
    };
  
    setModalIngredientAction();
  }, [dispatch, ingredientListRequest, ingredientListFailed, ingredientList, location.pathname]);
  

  if (modalIngredient) {
    return (
      <div data-testid="ingredient-details" className={styles.header} >
        <div className={styles.title}>Детали ингредиента</div>
        <div className={styles.parametres}>
          <div className={styles.image}>
            <img src={modalIngredient.image_large} 
            alt={modalIngredient.name} />
          </div>
          <div className={styles.name}>{modalIngredient.name}</div>
          <div className={styles.wrapper}>
            <div className={styles.column}>
              <div>Калории, ккал</div>
              <div>{modalIngredient.calories}</div>
            </div>
            <div className={styles.column}>
              <div>Белки, г</div>
              <div>{modalIngredient.proteins}</div>
            </div>
            <div className={styles.column}>
              <div>Жиры, г</div>
              <div>{modalIngredient.fat}</div>
            </div>
            <div className={styles.column}>
              <div>Углеводы, г</div>
              <div>{modalIngredient.carbohydrates}</div>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return null;
  }
}

export default IngredientDetails;
