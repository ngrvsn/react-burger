import React, { useEffect } from 'react';
import DoneIcon from '../../images/done.svg';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

import styles from './OrderDetails.module.css';

const OrderDetails = ({ orderId }) => {
    const order = useSelector(state => state.order.order);
    const orderRequest = useSelector(state => state.order.orderRequest);
    const orderFailed = useSelector(state => state.order.orderFailed);

    useEffect(() => {
        console.log("Номер заказа:", orderId);
    }, [orderId]);

    return (
      <div className={styles.wrapper}>
          {orderId && (
              <div className={styles.title}>
                  <div className={styles.orderNumber}>{orderId}</div>
                  <div>Идентификатор заказа</div>
              </div>

              
          )}
          <img className={styles.image} src={DoneIcon} alt='done image' />
          <div>Ваш заказ начали готовить</div>
                      <div>Дождитесь готовности на орбитальной станции</div>
          <div className={styles.bottom}>
              {!orderFailed && !orderRequest && order ? (
                  <div>
                      <div>Ваш заказ начали готовить</div>
                      <div>Дождитесь готовности на орбитальной станции</div>
                  </div>
              ) : (
                  <div>
                      {orderFailed && <p className={styles.paragraph}>Ошибка заказа</p>}
                      {orderRequest && <p className={styles.paragraph}>Загрузка...</p>}
                  </div>
              )}
          </div>
      </div>
  );
}

OrderDetails.propTypes = {
    orderId: PropTypes.number,
};

export default OrderDetails;
