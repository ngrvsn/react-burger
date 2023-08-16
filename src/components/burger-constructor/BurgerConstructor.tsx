import React, { useState, useMemo, FC } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDrop } from 'react-dnd';
import {
  DragIcon,
  CurrencyIcon,
  Button,
  ConstructorElement,
} from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import DraggableItem from './BurgerConstructorDrag';
import { getCookie } from '../../services/cookies';
import { API_DOMAIN } from '../../services/api-domain';
import { cancelOrder } from '../../services/actions/order';
import { setBurgerIngredientsList } from '../../services/actions/ingredient-list';
import axios from 'axios';
import { TIngredient, TBurgerIngredient, TIngredientProps } from '../../utils/types';

import styles from './BurgerConstructor.module.css';

const BurgerConstructor: FC = () => {
  const dispatch: Function = useDispatch();
  const navigate = useNavigate();
  const ingredients = useSelector((state: { [prop: string]: TBurgerIngredient }) => state.burgerConstructor.burgerIngredientsList);
  const [openModal, setOpenModal] = useState(false);
  const [orderNumber, saveOrderNumber] = useState(null);

  const setOrder = async () =>  {
    setOpenModal(true);
    if (getCookie('token') && localStorage.getItem('refreshToken')) {
      const ingredientIds = ingredients.map((item) => item._id);
      try {
        const response = await axios.post(`${API_DOMAIN}/api/orders`, {
          ingredients: ingredientIds,
        });

        if (response && response.data && response.data.success) {
          saveOrderNumber(response.data.order.number);
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
    } else {
      navigate('/login');
    }
  };

  const clickCloseModal = () => {
    setOpenModal(false);
    dispatch(cancelOrder());
  };

  const bunSelect = useMemo(() => ingredients.filter((item) => item.type === 'bun'), [ingredients]);
  const ingredientSelect = useMemo(() => ingredients.filter((item) => item.type !== 'bun'), [ingredients]);

  const AllPrice = useMemo(() => ingredients.reduce((acc, item) => acc + item.price * (item.type === 'bun' ? 2 : 1), 0), [ingredients]);

  const handleDrop = (item: any) => {
    let useItem = { ...item, dateValue: Date.now() };
    if (item.type === 'bun' && bunSelect.length > 0) {
      dispatch(setBurgerIngredientsList([...ingredientSelect, useItem]));
    } else {
      dispatch(setBurgerIngredientsList([...ingredients, useItem]));
    }
  };

  const [{ isHover }, dropItem] = useDrop({
    accept: ['bun', 'sauce', 'main'],
    drop(item) {
      handleDrop(item);
    },
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
  });

  const deleteIngredient = (ingredient: TIngredientProps): void => {
    const updatedIngredients = ingredients.filter((item) => ingredient.dateValue !== item.dateValue);
    dispatch(setBurgerIngredientsList(updatedIngredients as any));
  };

  const dragItem = (draggedId: number, hoveredId: number) => {
    const idDragItem = ingredients.findIndex((el) => el.dateValue === draggedId);
    const idHoveredItem = ingredients.findIndex((el) => el.dateValue === hoveredId);

    let choiceIngredients: any = [...ingredients];
    const dragItem: TBurgerIngredient = choiceIngredients.splice(idDragItem, 1)[0];
    choiceIngredients.splice(idHoveredItem, 0, dragItem);

    dispatch(setBurgerIngredientsList(choiceIngredients));
  };

  const border = isHover ? '2px solid' : 'none';

  return (
    <section className={styles.section} style={{ border }} ref={dropItem}>
      <section className={styles.wrapper}>
        {bunSelect.length > 0 ? (
          bunSelect.map((ingredient: TIngredientProps) => (
            <section key={ingredient.dateValue} className={styles.ingredient}>
              <div className={styles.ingredientIconWrapper}>
                {ingredient.isLocked ? <DragIcon type="primary" /> : null}
                <ConstructorElement
                  isLocked
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image || ''}
                  handleClose={() => {
                    deleteIngredient(ingredient);
                  }}
                />
              </div>
            </section>
          ))
        ) : (
          <div className={styles.topBun}>Выберите булку</div>
        )}

        {ingredientSelect.length > 0 ? (
          <section className={`${styles.scroller} custom-scroll`}>
            {ingredientSelect.map((ingredient: TIngredientProps) => (
              <DraggableItem
                key={ingredient.dateValue}
                className={styles.ingredient}
                dragItem={dragItem}
                item={ingredient}
              >
                <div className={styles.ingredientInside}>
                  {ingredient.isLocked ? <DragIcon type="primary" /> : null}
                  <ConstructorElement
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image || ''}
                    handleClose={() => {
                      deleteIngredient(ingredient);
                    }}
                  />
                </div>
              </DraggableItem>
            ))}
          </section>
        ) : (
          <div className={styles.choiceIngredients}>Выберите ингредиенты</div>
        )}

        {bunSelect.length > 0 ? (
          bunSelect.map((ingredient) => (
            <section key={ingredient.dateValue} className={styles.ingredient}>
              <div className={styles.ingredientIconWrapper}>
                <ConstructorElement
                  isLocked
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image || ''}
                  handleClose={() => {
                    deleteIngredient(ingredient);
                  }}
                />
              </div>
            </section>
          ))
        ) : (
          <div className={styles.bottomBun}>Выберите булку</div>
        )}
      </section>

      <section className={styles.bottom}>
        <p className={styles.paragraph}>
          <span className={styles.price}>{AllPrice}</span>
          <CurrencyIcon type="primary" />
        </p>
        <div className={styles.button}>
          <Button
            disabled={!(ingredients.length > 0 && bunSelect.length > 0)}
            onClick={setOrder}
            htmlType="button"
            type="primary"
            size="medium"
          >
            Оформить заказ
          </Button>
        </div>
      </section>

      {openModal && (
        <Modal onClose={clickCloseModal}>
          <OrderDetails orderId={orderNumber} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
