import React from 'react';
import DoneIcon from '../../images/done.svg';

import styles from './OrderDetails.module.css';

function OrderDetails() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <div className={styles.orderNumber}>034536</div>
        <div>Идентификатор заказа</div>
      </div>
      <img className={styles.image} src={DoneIcon} alt='done image' />
      <div className={styles.bottom}>
        <div>Ваш заказ начали готовить</div>
        <div>Дождитесь готовности на орбитальной станции</div>
      </div>
    </div>
  );
}

export default OrderDetails;
