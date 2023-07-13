import React from 'react';
import PropTypes from 'prop-types';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AllPrice.module.css';

const calculateSum = (items) => {
    return items.reduce((acc, item) => acc + item.price, 0);
  };
  
  const AllPrice = ({ bun, ingredients }) => {
    const sumBun = calculateSum(bun) * 2;
    const sumIngredients = calculateSum(ingredients);
    const sum = isNaN(sumBun + sumIngredients) ? 0 : sumBun + sumIngredients;
  
    return (
      <div className={styles.price}>
        <span>{sum}</span>
        <CurrencyIcon type='primary' />
      </div>
    );
  };
  
  AllPrice.propTypes = {  
      ingredients: PropTypes.arrayOf(PropTypes.object).isRequired,
      bun: PropTypes.arrayOf(PropTypes.object).isRequired
  };
  
  export default AllPrice;
