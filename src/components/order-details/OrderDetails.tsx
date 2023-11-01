import DoneIcon from '../../images/done.svg';
import { RootState, useSelector } from '../../utils/types';

import styles from './OrderDetails.module.css';

type TOrderProp = {
  orderId: number | null;
  status: string | null;
};

const OrderDetails = ({ orderId, status }: TOrderProp) => {
  const order = useSelector((state: RootState) => state.order.order);
  const orderRequest = useSelector((state: RootState) => state.order.orderRequest);
  const orderFailed = useSelector((state: RootState) => state.order.orderFailed);

  return (
    <div className={styles.wrapper}>
      

      <div className={styles.bottom}>
        {orderId ? (
          <div className={styles.title}>
            {status === 'done' ? (
              <div>
                <div className={styles.orderNumber}>{orderId}</div>
                <div>Идентификатор заказа</div>
                <img className={styles.image} src={DoneIcon} alt='done image' />
                <div>Ваш заказ готов</div>

              </div>
            ) : (
              <div>
                <div className={styles.orderNumber}>Ожидайте</div>
              </div>
            )}
          </div>
        ) : (
          <div className={styles.waitin}>
            <div>Ваш заказ начали готовить</div>
            <div>Дождитесь готовности на орбитальной станции</div>
          </div>
        )}

        {!orderFailed && !orderRequest && order ? (
          <div>
            <div>
              {status === 'pending'
                ? 'Ваш заказ начали готовить'
                : 'Ваш заказ готов'}
            </div>
            <div>Дождитесь готовности на орбитальной станции</div>
          </div>
        ) : (
          <div>
            {orderFailed && <p className={styles.paragraph}>Ошибка заказа</p>}
            {orderRequest && <p className={styles.paragraph}>Загрузка</p>}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderDetails;
