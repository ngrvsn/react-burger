import React, { useEffect, useState, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { setModalIngredient } from '../../services/actions/modal-item';
import { getIngedients } from '../../services/actions/ingredients';
import { TIngredient, TModal, TIngredientProps } from '../../utils/types';

import styles from './IngredientDetails.module.css';

const IngredientDetails: FC = ( ) => {
  const dispatch: Function = useDispatch();
  const modalIngredient = useSelector((state: { modalItem: TModal }) => state.modalItem.modalIngredient);
  const ingredientListFailed = useSelector((state: { ingredients: TIngredient }) => state.ingredients.ingredientListFailed);
  const ingredientListRequest = useSelector((state: { ingredients: TIngredient }) => state.ingredients.ingredientListRequest);
  const ingredientList = useSelector((state: { ingredients: TIngredient })=> state.ingredients.ingredientList);
  const location = useLocation();
  
  const [selectedIngredient, setSelectedIngredient] = useState<TIngredientProps | null>(null);
  
  useEffect(() => {
    const fetchIngredientsList = async () => {
      if (!location.state) {
        await dispatch(getIngedients()); 
      }
    };
  
    fetchIngredientsList();
  }, [dispatch, location.state]);

  useEffect(() => {
    const setModalIngredientAction = () => {
      if (!ingredientListRequest && !ingredientListFailed && ingredientList?.length) {
        const listId = location.pathname.split('/ingredients/')[1];
        const list = ingredientList.filter(item => item._id === listId);
        if (list.length > 0) {
          dispatch(setModalIngredient(list[0] as unknown as TIngredient)); 
          setSelectedIngredient(list[0]);
        }
      }
    };
  
    setModalIngredientAction();
  }, [dispatch, ingredientListRequest, ingredientListFailed, ingredientList, location.pathname]);
  

  if (modalIngredient) {
    return (
      <div className={styles.header}>
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