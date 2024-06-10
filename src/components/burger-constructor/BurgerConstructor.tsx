import React, { useState, useMemo, FC } from 'react';
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
import { cancelOrder } from '../../services/actions/order';
import { setBurgerIngredientsList } from '../../services/actions/ingredient-list';
import { createOrderWithTokenRefresh } from '../../services/authoris-api';
import {
  TBurgerIngredient,
  TIngredientProps,
  RootState,
  useDispatch,
  useSelector,
} from '../../utils/types';

import styles from './BurgerConstructor.module.css';

const BurgerConstructor: FC = () => {
  const dispatch: Function = useDispatch();
  const navigate = useNavigate();
  const ingredients = useSelector((state: RootState) => state.burgerConstructor.burgerIngredientsList);
  const [openModal, setOpenModal] = useState(false);
  const [orderNumber, saveOrderNumber] = useState<number | null>(null);
  const [orderStatus, setOrderStatus] = useState<string | null>(null);

  const setOrder = async () => {
    setOpenModal(true);
    const token = getCookie('token');

    if (token && localStorage.getItem('refreshToken')) {
      const ingredientIds: string[] = ingredients.map((item) => item._id);

      const orderResponse = await createOrderWithTokenRefresh(ingredientIds, token);

      if (orderResponse.success) {
        saveOrderNumber(orderResponse.orderNumber || null);
        setOrderStatus(orderResponse.orderStatus || null);
      } else {
        console.error(orderResponse.errorMessage || 'ошибка');
      }
    } else {
      navigate('/login');
    }
  };

  


  const clickCloseModal = () => {
    setOpenModal(false);
    dispatch(cancelOrder());
    saveOrderNumber(null);
    setOrderStatus(null);
  };

  const { bunSelect, ingredientSelect } = useMemo(() => {
    return {
      bunSelect: ingredients.filter((item) => item.type === 'bun'),
      ingredientSelect: ingredients.filter((item) => item.type !== 'bun'),
    };
  }, [ingredients]);

  const AllPrice = useMemo(
    () =>
      ingredients.reduce(
        (acc, item) => acc + item.price * (item.type === 'bun' ? 2 : 1),
        0
      ),
    [ingredients]
  );

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
    const updatedIngredients = ingredients.filter(
      (item) => ingredient.dateValue !== item.dateValue
    );
    dispatch(setBurgerIngredientsList(updatedIngredients as any));
  };

  const dragItem = (draggedId: number, hoveredId: number) => {
    const idDragItem = ingredients.findIndex(
      (el) => el.dateValue === draggedId
    );
    const idHoveredItem = ingredients.findIndex(
      (el) => el.dateValue === hoveredId
    );

    let choiceIngredients: any = [...ingredients];
    const dragItem: TBurgerIngredient = choiceIngredients.splice(
      idDragItem,
      1
    )[0];
    choiceIngredients.splice(idHoveredItem, 0, dragItem);

    dispatch(setBurgerIngredientsList(choiceIngredients));
  };

  const border = isHover ? '2px solid' : 'none';

  return (
    <section className={styles.section} style={{ border }} ref={dropItem}>
      <section data-test-id="drop-zone" className={styles.wrapper}>
        {bunSelect.length > 0 ? (
          bunSelect.map((ingredient: TIngredientProps) => (
            <section key={ingredient.dateValue} className={styles.ingredient}>
              <div data-test-id="topbun-check" className={styles.ingredientIconWrapper}>
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
          <div data-test-id="constructor-bun" className={styles.topBun}>Выберите булку</div>
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
                <div data-test-id="ingredient-check" className={styles.ingredientInside}>
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
          <div data-test-id="constructor-items" className={styles.choiceIngredients}>Выберите ингредиенты</div>
        )}

        {bunSelect.length > 0 ? (
          bunSelect.map((ingredient) => (
            <section data-test-id="bottombun-check" key={ingredient.dateValue} className={styles.ingredient}>
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
        <div data-testid="order-button" className={styles.button}>
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
        <Modal  onClose={clickCloseModal}>
          <OrderDetails orderId={Number(orderNumber)} status={orderStatus} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
