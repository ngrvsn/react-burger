import React, { useState } from 'react';
import { DragIcon, Button, ConstructorElement, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import Modal from '../modal/Modal';
import OrderDetails from '../order-details/OrderDetails';
import PropTypes from 'prop-types';

import styles from './BurgerConstructor.module.css';

function BurgerConstructor({ bun, listElements }) {
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };


  
  const renderScrollList = () => {
    return listElements.map((item) => {
      const { _id, name, price, image } = item;
      return (
        
        <div key={`scroll_${_id}`}>
          <DragIcon type='primary' />
          <ConstructorElement
            text={name}
            price={price}
            thumbnail={image}
          />
          
        </div>
      );
    });
  };

  const bunName = `${bun.name} (верх)`;
  const bunPrice = bun.price;
  const bunImage = bun.image;
  const bunKey = `top_${bun._id}`;

  return (
    <section className={styles.wrapper}>
      <section className={styles.elements}>
        <div className={styles.elementWrapper}>
          <ConstructorElement
            key={bunKey}
            type='top'
            isLocked={true}
            text={bunName}
            price={bunPrice}
            thumbnail={bunImage}
          />
        </div>
  
        <div className={styles.scroller}>
          <div className='custom-scroll'>{renderScrollList()}</div>
        </div>
  
        <div className={styles.elementWrapper}>
          <ConstructorElement
            key={`bottom_${bun._id}`}
            type='bottom'
            isLocked={true}
            text={`${bun.name} (низ)`}
            price={bunPrice}
            thumbnail={bunImage}
          />
        </div>
      </section>
  
      <div className={styles.bottom}>
        <div className={styles.price}>
          <span>610</span>
          <CurrencyIcon type='primary' />
        </div>
        <div className={styles.button}>
          <Button type='primary' onClick={openModal}>
            Оформить заказ
          </Button>
        </div>
      </div>
  
      {isOpen && (
        <Modal onClose={closeModal}>
          <OrderDetails />
        </Modal>
      )}
    </section>
  );
}

BurgerConstructor.propTypes = {
  bun: PropTypes.object.isRequired,
  listElements: PropTypes.array.isRequired,
};

export default BurgerConstructor;