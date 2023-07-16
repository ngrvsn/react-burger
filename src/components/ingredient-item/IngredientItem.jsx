import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ingredientType from '../../utils/types';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

import styles from './IngredientItem.module.css';

const IngredientItem = ({ item, handleClick, count, updateIngredientCounter }) => {
  const [localCount, setLocalCount] = useState(0);

  useEffect(() => {
    setLocalCount(count);
  }, [count]);

  const handleIncrement = () => {
    const newCount = localCount + 1;
    setLocalCount(newCount);
    updateIngredientCounter(item._id, newCount);
  };

  const handleDecrement = () => {
    if (localCount > 0) {
      const newCount = localCount - 1;
      setLocalCount(newCount);
      updateIngredientCounter(item._id, newCount);
    }
  };

  const [{ isDrag }, dragRef] = useDrag({
    type: 'ingredients',
    item: () => {
      return { id: item._id };
    },
    collect: (monitor) => ({
      isDrag: monitor.isDragging(),
    }),
  });

  return (
    !isDrag && (
      <div
        className={styles.item}
        id={item._id}
        data-id={item._id}
        data-value={item.type}
        onClick={handleClick}
        ref={dragRef}
        style={{ cursor: 'move' }}
      >
        <div className={styles.counterWrapper}>
          {localCount > 0 && (
            <Counter count={localCount} size='default' extraClass={styles.counter} />
          )}
        </div>

        <img className={styles.image} src={item.image} alt={item.name} />
        <div className={styles.price}>
          <span>{item.price}</span>
          <CurrencyIcon type='primary' />
        </div>
        <h2 className={styles.title}>{item.name}</h2>
      </div>
    )
  );
};

IngredientItem.propTypes = {
  item: ingredientType,
  handleClick: PropTypes.func.isRequired,
  count: PropTypes.number,
  updateIngredientCounter: PropTypes.func.isRequired,
};

export default IngredientItem;
