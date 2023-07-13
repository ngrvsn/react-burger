// BurgerConstructor.jsx
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '@ya.praktikum/react-developer-burger-ui-components';

import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import AllPrice from '../all-price/AllPrice';
import BunBoard from '../bun-board/BunBoard';
import IngredientsBoard from '../ingredients-board/IngedientsBoard';

import { GET_ORDER_PRICE, UPDATE_ORDERS, loadOrder } from '../../services/actions/order.js';
import { useModal } from '../../hooks/useModal';

import styles from './BurgerConstructor.module.css';

const BurgerConstructor = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);
  const boards = useSelector((state) => state.boardList.boards);
  const ingredientsSelect = useSelector((state) => state.constructorItemsList.constructorItems);
  const bunSelect = useSelector((state) => state.constructorItemsList.constructorBun);
  const { isModalOpen, openModal, closeModal } = useModal();


  const allOrderItems = [...bunSelect, ...ingredientsSelect];

  const idOrder = (arr) => {
    return arr.reduce((orderId, item) => {
      orderId.push(item._id);
      return orderId;
    }, []);
  };

  useEffect(() => {
    dispatch({ type: GET_ORDER_PRICE });
  }, [dispatch]);

  useEffect(() => {
    dispatch({
      type: UPDATE_ORDERS,
      payload: [...bunSelect, ...ingredientsSelect],
    });
  }, [dispatch, ingredientsSelect, bunSelect]);

  const clickOpenModal = () => {
    const orderId = idOrder(allOrderItems);
    dispatch(loadOrder(orderId));
    openModal();
  };

  return (
    <section className={styles.wrapper}>
      <section className={styles.elements}>
        <BunBoard
          items={bunSelect}
          board={boards[0]}
          type='top'
          title=' (верх)'
          classBun={styles.topBun}
        />
        <div className={styles.scroller}>
          <div className='custom-scroll'>
            <IngredientsBoard
              items={ingredientsSelect}
              board={boards[1]}
              classIngredients={styles.choiceIngredients}
            />
          </div>
        </div>
        <BunBoard
          items={bunSelect}
          board={boards[0]}
          type='bottom'
          title=' (низ)'
          classBun={styles.bottomBun}
        />
      </section>
      <div className={styles.bottom}>
        <AllPrice bun={bunSelect} ingredients={ingredientsSelect} />
        <Button
          htmlType='button'
          type='primary'
          size='medium'
          onClick={clickOpenModal}
          disabled={bunSelect.length === 0}
        >
          Оформить заказ
        </Button>
      </div>
      {isModalOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails orderId={orders.number} />
        </Modal>
      )}
    </section>
  );
};

export default BurgerConstructor;
