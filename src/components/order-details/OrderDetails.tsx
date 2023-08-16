import React, { useEffect } from 'react';
import DoneIcon from '../../images/done.svg';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { TOrder } from '../../utils/types';

import styles from './OrderDetails.module.css';

type TOrderProp = {
    orderId: number | null;
  }; 

const OrderDetails = ({ orderId }: TOrderProp) => {
    const order = useSelector((state: { [prop: string]: TOrder }) => state.order.order);
    const orderRequest = useSelector((state: { [prop: string]: TOrder }) => state.order.orderRequest);
    const orderFailed = useSelector((state: { [prop: string]: TOrder }) => state.order.orderFailed);


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


export default OrderDetails;
