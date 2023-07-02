import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ingredientType from '../../utils/types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './IngredientItem.module.css';

const IngredientItem = ({ item, handleClick }) => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  return (
    <div
      className={styles.item}
      data-id={item._id}
      data-value={item.type}
      onClick={handleClick}
    >
      {count !== 0 && <Counter count={count} />}

      <img className={styles.image} src={item.image} alt={item.name} />
      <div className={styles.price}>
        <span>{item.price}</span>
        <CurrencyIcon type='primary' />
      </div>
      <h2 className={styles.title}>{item.name}</h2>
    </div>
  );
};

IngredientItem.propTypes = {
  item: ingredientType,
  handleClick: PropTypes.func.isRequired,
};

export default IngredientItem;
