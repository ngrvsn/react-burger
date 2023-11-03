import React, { FC, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useMatch } from 'react-router-dom';
import { TOrdersSectionProps } from '../../../utils/types';
import styles from './feed.module.css';
import { FormattedDate, CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { Link } from 'react-router-dom'; 
import { useSelector } from 'react-redux';
import { getIngredients } from '../../../services/actions/ingredients';
import { AppDispatch, TIngredientProps, RootState, useDispatch } from '../../../utils/types';
import { TIngredientsState } from '../../../services/reducers/ingredients';
import { WebSocketStart, WebSocketsClose } from '../../../services/actions/orders-all';
import { getCookie } from '../../../services/cookies';
import { WebSocketStartUser, WebSocketsCloseUser } from '../../../services/actions/orders-user';

const Feed: FC = () => {
    const location = useLocation();
    const match = useMatch('/feed'); 
    const currentURL = location.pathname;
    const dispatch: AppDispatch = useDispatch();
    const publicOrders = useSelector((state: RootState) => state.orderTracking.orders);
    const userOrders = useSelector((state: RootState) => state.orderTrackingUser.orders);
    const ingredientsList = useSelector((state: { [prop in string]: TIngredientsState }) => state.ingredients.ingredientList);

    console.log('Текущий URL:', currentURL);
    const token = getCookie("token");

    useEffect(() => {
        if (location.pathname.startsWith('/feed')) {
            dispatch(getIngredients());
            dispatch(WebSocketStart());
        } 
    
        return () => {
            dispatch(WebSocketsClose());
        };
         // eslint-disable-next-line
    }, [location.pathname]);
    



    useEffect(() => {
        if (location.pathname.startsWith('/profile')) {
            dispatch(getIngredients());
            if (token !== undefined) {
  dispatch(WebSocketStartUser(token));
}
        } 
    
        return () => {
            dispatch(WebSocketsCloseUser());
        };
         // eslint-disable-next-line
    }, [location.pathname]);

    

    const ingredientsInfo = (id: string[]): TIngredientProps[] => {
        const selectedIngredients = ingredientsList.filter(item => id.includes(item._id));
        return selectedIngredients;
    };

    const calculateTotalPrice = (ingredients: TIngredientProps[]): number => {
        return ingredients.reduce((e, item) => {
            return e + item.price * (item.type === 'bun' ? 2 : 1);
        }, 0);
    };

    const orderStatus = (status: string): string => {
        switch (status) {
        case 'done':
        default:
            return 'Выполнен';
        case 'pending':
            return 'В работе';
        case 'created':
            return 'Создан'
    }
    }
    
    
    const statusText = orderStatus;


    

    const ordersSplit = (item: TOrdersSectionProps) => {
        const ingredients = ingredientsInfo(item.ingredients);
        const totalPrice = calculateTotalPrice(ingredients);
        const displayedIngredients = ingredients.slice(0, 6);

        return (
            <section key={item._id} className={styles.section}>
                <Link
                    className={`${styles.dates}`}
                    to={`${item._id}`}
                    state={{ backgroundLocation: location }}
                >
                    <div>
                        <div className={styles.info}>#{item.number}</div>
                        <div className={`${styles.time} text_color_inactive`}><FormattedDate date={new Date(item.createdAt)} /></div>
                    </div>

                    <p className={styles.title}>{item.name}</p>
                    <div className={`${styles.wrapper}`}>
                    {!match && <h1 className={styles.state}>{statusText(item.status)}</h1>}
                        <div className={`${styles.fragment}`}>
                            {displayedIngredients.map((ingredient, key) => (
                                <div
                                    key={key}
                                    className={styles.images}
                                >
                                    <img alt={ingredient.name} src={ingredient.image} />
                                </div>
                            ))}
                            {ingredients.length > 6 && (
                                <div className={styles.imagesPlus}>
                                    +{ingredients.length - 6}
                                </div>
                            )}
                        </div>
                        <div className={styles.price}>
                            <div className={styles.total}>
                                {totalPrice} 
                            </div>
                            <div className={styles.currency}>
                                <CurrencyIcon type="primary" />
                            </div>
                        </div>
                    </div>
                </Link>
            </section>
        );
    };

    return (
        <section className={styles.section}>
            {match && <h1 className="text text_type_main-large ">Лента заказов</h1>}
            
            <section className={`${styles.scroll} custom-scroll`}>
                {match ? (
                    publicOrders.map(ordersSplit)
                ) : (
                    userOrders.slice().reverse().map(ordersSplit)
                    
                )}
            </section>
           
        </section>
    );
}

export default Feed;
