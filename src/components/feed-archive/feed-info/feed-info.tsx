import React, { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { CurrencyIcon, FormattedDate } from '@ya.praktikum/react-developer-burger-ui-components';
import { AppDispatch, TOrdersSectionProps, TIngredientProps, useDispatch, RootState } from '../../../utils/types';
import { TIngredientsState } from '../../../services/reducers/ingredients';
import { useLocation } from 'react-router-dom'; 
import { getIngredients } from '../../../services/actions/ingredients';
import { updateOrder } from '../../../services/actions/order';



import styles from './feed-info.module.css';

const FeedInfo: FC = () => {
    const location = useLocation();
    const dispatch: AppDispatch = useDispatch();
    const updatedOrder = useSelector((state: RootState) => state.order.updatedOrder);
    const ingredientsList = useSelector((state: { [prop in string]: TIngredientsState }) => state.ingredients.ingredientList);
    const ordersPublic = useSelector((state: RootState) => state.orderTracking.orders);
    const ordersUser = useSelector((state: RootState) => state.orderTrackingUser.orders);

  

    useEffect(() => {
        const storedOrderData = localStorage.getItem('currentOrder');
        if (storedOrderData) {
            const currentOrder = JSON.parse(storedOrderData);
            dispatch(updateOrder(currentOrder));
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, []);


    const ordersSplit = (): void => {
        const path = location.pathname.includes('/profile/') ? location.pathname.split('/profile/orders/')[1] : location.pathname.split('/feed/')[1];

        const selectedOrder = (location.pathname.includes('/profile/') ? ordersUser : ordersPublic).find((item: TOrdersSectionProps) => item._id === path);

        if (selectedOrder) {
            dispatch(updateOrder(selectedOrder));
            localStorage.setItem('currentOrder', JSON.stringify(selectedOrder));
        }
    };

  /* eslint-disable */
useEffect(() => {
    if (updatedOrder === null) ordersSplit();
    if (!location.state) {
        ordersSplit();
        dispatch(getIngredients());
    }

    return () => {
        dispatch(updateOrder(null));
    };
}, [location.pathname]);
/* eslint-enable */

    const infoItem = (): TIngredientProps[] => {
        const ingredientId: string[] = updatedOrder ? updatedOrder.ingredients : [];
        return ingredientsList.filter(item => ingredientId.includes(item._id));
    };

    const itemsNumbers = (item: TIngredientProps): number | undefined => {
        if (updatedOrder) {
            const count = updatedOrder.ingredients.filter(e => e === item._id).length;
            return count;
        }
    };

    const calculateTotalPrice = (): number => {
        return infoItem().reduce((acc: number, item: TIngredientProps) => {
            if (item.type === 'bun') {
                return acc + (item.price * 2);
            }
            return acc + item.price;
        }, 0);
    };

    

    const orderStatus = (): string => {
        switch (updatedOrder?.status) {
            case 'done':
                return 'Выполнен';
            case 'pending':
                return 'В работе';
            case 'created':
            default:
                return 'Создан';
        }
    };

    const statusText = orderStatus();

    return (
        <main className={styles.main}>
            {updatedOrder && (
                <>
                    <h2 className={styles.header}>
                        #{updatedOrder.number}
                    </h2>

                    <h2 className={styles.text}>
                        {updatedOrder.name}
                    </h2>

                    <div className={`${styles.state} ${styles[updatedOrder.status]}`}>
                        {statusText}
                    </div>

                    <p className={styles.text}>
                        Состав:
                    </p>

                    <div className={`${styles.scroller} custom-scroll`}>
                        {infoItem().map((item, key) => (
                            <div key={key} className={styles.ingredient}>
                                <div className={styles.ingredientWarpper}>
                                    <div className={styles.image}>
                                        <img alt={item.name} src={item.image} />
                                    </div>
                                    <p className={styles.title}>
                                        {item.name}
                                    </p>
                                </div>
                                <div className={styles.price}>
                                    <div className={styles.numbers}>
                                        {`${itemsNumbers(item)} x ${item.price}`}
                                    </div>
                                    <div className={styles.primaryFeed}>
                                        <CurrencyIcon type="primary" />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className={styles.bottom}>
                        <div className={`${styles.time} text_color_inactive`}>
                            <FormattedDate date={new Date(updatedOrder.createdAt)} />
                        </div>
                        <div className={styles.priceAll}>
                            <div className={styles.currency}> <CurrencyIcon type="primary" /> </div>
                            <div className={styles.ingredientsPrice}>
                                {calculateTotalPrice()}
                            </div>
                        </div>
                    </div>
                </>
            )}
        </main>
    );
};

export { FeedInfo };
