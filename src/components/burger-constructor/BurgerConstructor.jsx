import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDrop } from "react-dnd";
import { DragIcon, CurrencyIcon, Button, ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import DraggableItem from './BurgerConstructorDrag';
import { getCookie } from '../../services/cookies';
import { API_DOMAIN } from '../../services/api-domain';
import { cancelOrder, getOrder } from '../../services/actions/order';
import { setBurgerIngredientsList } from '../../services/actions/ingredient-list';
import axios from 'axios'; 

import styles from './BurgerConstructor.module.css';

const BurgerConstructor = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const ingredients = useSelector(state => state.burgerConstructor.burgerIngredientsList);
    const [openModal, setOpenModal] = useState(false);
    const [orderNumber, saveOrderNumber] = useState(null);

    // useMemo
    const { bunSelect, ingredientSelect } = useMemo(() => {
        return ingredients.reduce((acc, item) => {
            if (item.type === 'bun') {
                acc.bunSelect.push(item);
            } else {
                acc.ingredientSelect.push(item);
            }
            return acc;
        }, { bunSelect: [], ingredientSelect: [] });
    }, [ingredients]);

    const AllPrice = useMemo(() => ingredients.reduce((acc, item) => acc + item.price * (item.type === 'bun' ? 2 : 1), 0), [ingredients]);

    // useDrop
    const [{ isHover }, dropItem] = useDrop({
        accept: ["bun", "sauce", "main"],
        drop(item) {
            handleDrop(item);
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    // Стиль границы
    const border = isHover ? '2px solid' : 'none';

    // Функции
    const setOrder = async () => {
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
    }

    const handleDrop = (item) => {
        let useItem = { ...item, dateValue: Date.now() }
        if (item.type === "bun" && bunSelect.length > 0) {
            dispatch(setBurgerIngredientsList([
                ...ingredientSelect,
                useItem
            ]));
        } else {
            dispatch(setBurgerIngredientsList([
                ...ingredients,
                useItem
            ]));
        }
    };

    const deleteIngredient = (ingredient) => {
        dispatch(setBurgerIngredientsList(ingredients.filter((item) => ingredient.dateValue !== item.dateValue)));
    }

    const dragItem = (draggedId, hoveredId) => {
        const idDragItem = ingredients.findIndex(el => el.dateValue === draggedId);
        const dragItem = ingredients.find(el => el.dateValue === draggedId);
        const idHoveredItem = ingredients.findIndex(el => el.dateValue === hoveredId);

        let choiceIngredients = [...ingredients];
        choiceIngredients.splice(idDragItem, 1);
        choiceIngredients.splice(idHoveredItem, 0, dragItem);

        dispatch(setBurgerIngredientsList(choiceIngredients));
    };

    // Возвращение компонента
    return (
        <section className={styles.section} style={{ border }} ref={dropItem}>
          <section className={styles.wrapper}>
            {bunSelect.length > 0 ? bunSelect.map((ingredient) => (
              <section key={ingredient.dateValue} className={styles.ingredient}>
                <div className={styles.ingredientIconWrapper}>
                  {ingredient.isLocked ? <DragIcon type="primary" /> : null}
                  <ConstructorElement
                    type="top"
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    isLocked={true}
                    text={`${ingredient.name} (верх)`}
                  />
                </div>
              </section>
            )) :
            <div className={styles.topBun}>Выберите булку</div>
            }
      
            {ingredientSelect.length > 0 ?
              <section className={`${styles.scroller} custom-scroll`}>
                {ingredientSelect.map((ingredient) => (
                  <DraggableItem
                    key={ingredient.dateValue}
                    className={styles.ingredient}
                    currentItem={ingredient}
                    dragItem={dragItem}
                    item={ingredient}
                  >
                    <div className={styles.ingredientInside}>
                      {ingredient.isLocked ? <DragIcon type="primary" /> : null}
                      <ConstructorElement
                        text={ingredient.name}
                        price={ingredient.price}
                        thumbnail={ingredient.image}
                        clickCloseModal={() => {
                          deleteIngredient(ingredient);
                        }}
                      />
                    </div>
                  </DraggableItem>
                ))}
              </section>
              :
              <div className={styles.choiceIngredients}>Выберите ингредиенты</div>
            }
      
            {bunSelect.length > 0 ? bunSelect.map((ingredient) => (
              <section key={ingredient.dateValue} className={styles.ingredient} >
                <div className={styles.ingredientIconWrapper}>
                  
                  <ConstructorElement
                    type="bottom"
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    isLocked={true}
                    text={`${ingredient.name} (низ)`}
                  />
                </div>
              </section>
            )) :
              <div className={styles.bottomBun}>Выберите булку</div>
            }
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

            {openModal && <Modal onClose={clickCloseModal}>
                <OrderDetails orderId={orderNumber} />
            </Modal>}
        </section>
    );
}
      
      export default BurgerConstructor;