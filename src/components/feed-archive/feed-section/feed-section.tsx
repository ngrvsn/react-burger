import React, { FC } from 'react';
import styles from './feed-section.module.css';
import { RootState, useSelector } from '../../../utils/types';

const FeedSection: FC = () => {
    const orders = useSelector((state: RootState) => state.orderTracking.orders);
    const allOrders = useSelector((state: RootState) => state.orderTracking.total);
    const totalToday = useSelector((state: RootState) => state.orderTracking.totalToday);

    const last20Orders = orders.slice(0, 20);

    const readyOrdersNumbers = last20Orders
      .filter(item => item.status === 'done')
      .map(item => item.number)
      .join(' ');
  
    const inProgressOrdersNumbers = last20Orders
      .filter(item => item.status === 'pending')
      .map(item => item.number)
      .join(' ');

      return (
        <section className={`${styles.section} custom-scroll`}>
          <div className={styles.wrapper}>
            <div className={styles.allInfo}>
              <div className={styles.readyOrder}>
                <div className={styles.extraWrapper}>
                  <h2 className={styles.text}>Готовы:</h2>
                  <div className={styles.columnWrapper}>
                    {readyOrdersNumbers
                      .split(' ')
                      .slice(0, 10)
                      .map((item, index) => (
                        <div key={index} className={styles.number}>
                          {item}
                        </div>
                      ))}
                  </div>
                  <div className={styles.columnWrapper}>
                    {readyOrdersNumbers
                      .split(' ')
                      .slice(10, 20)
                      .map((item, index) => (
                       <div className={styles.second}> <div key={index} className={styles.number}>
                          {item}
                        </div></div>
                      ))}
                  </div>
                </div>
              </div>
              <div className={styles.inProgress}>
                <div className={styles.extraWrapper}>
                  <h2 className={styles.textWork}>В работе:</h2>
                  <div className={styles.numberProgress}>{inProgressOrdersNumbers}</div>
                </div>
              </div>
            </div>
            <div className={styles.allInfo}>
              <div className={styles.extraWrapperBottom}>
                <h2 className={styles.text}>Выполнено за все время:</h2>
                <div className={styles.doneOrder}>{allOrders}</div>
              </div>
            </div>
            <div className={styles.allInfo}>
              <div className={styles.extraWrapperBottom}>
                <h2 className={styles.text}>Выполнено за сегодня:</h2>
                <div className={styles.doneOrder}>{totalToday}</div>
              </div>
            </div>
          </div>
        </section>
      );
      
      
};

export default FeedSection;
