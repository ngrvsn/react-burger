import React, { FC } from 'react';
import styles from './feed-section.module.css';
import { RootState, useSelector } from '../../../utils/types';

const FeedSection: FC = () => {
    const orders = useSelector((state: RootState) => state.orderTracking.orders);
    const allOrders = useSelector((state: RootState) => state.orderTracking.total);
    const totalToday = useSelector((state: RootState) => state.orderTracking.totalToday);

    const last10Orders = orders.slice(0, 10);
    const last10Orders2 = orders.slice(10, 20);

    const readyOrders = last10Orders.filter(item => item.status === 'done');
    const readyOrders2 = last10Orders2.filter(item => item.status === 'done');
    const inProgressOrders = last10Orders.filter(item => item.status === 'pending');

    const readyOrdersNumbers = readyOrders.map(item => item.number).join(' ');
    const readyOrdersNumbers2 = readyOrders2.map(item => item.number).join(' ');
    const inProgressOrdersNumbers = inProgressOrders.map(item => item.number).join(' ');

    return (
        <section className={`${styles.section} custom-scroll`}>
            <div className={styles.wrapper}> 
                <div className={styles.allInfo} >
                    <div className={styles.readyOrder}>
                        <div className={styles.extraWrapper}> 
                            <h2 className={styles.text}>Готовы:</h2>
                            <div className={styles.readyColumn}>
                            <div className={styles.number}>{readyOrdersNumbers}</div>
                            <div className={styles.number}>{readyOrdersNumbers2}</div>
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
        </section>
    );
};

export default FeedSection;
