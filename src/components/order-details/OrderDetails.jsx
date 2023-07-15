import React from 'react';
import DoneIcon from '../../images/done.svg';
import PropTypes from 'prop-types';

import styles from './OrderDetails.module.css';

function OrderDetails({ orderId }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <div className={styles.orderNumber}>{orderId}</div>
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

OrderDetails.propTypes = {
  orderId: PropTypes.number,
};

export default OrderDetails;
