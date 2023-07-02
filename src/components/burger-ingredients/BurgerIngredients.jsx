import React, { useState, useRef, memo } from 'react';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import IngredientItem from '../ingredient-item/IngredientItem';
import Modal from '../modal/Modal';
import PropTypes from 'prop-types';
import ingredientType from '../../utils/types';

import styles from './BurgerIngredients.module.css';

const BurgerIngredients = memo(({ ingredients }) => {
  const [current, setCurrent] = useState('bunRef');
  const [open, setOpen] = useState(false);
  const [item, setItem] = useState({});

  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);

  const handleOpenModal = (ingredient) => {
    setItem(ingredient);
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const setActiveTab = (value) => {
    setCurrent(value);

    let ref;
    if (value === 'bunRef') {
      ref = bunRef;
    } else if (value === 'sauceRef') {
      ref = sauceRef;
    } else if (value === 'mainRef') {
      ref = mainRef;
    }

    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const bunIngredients = ingredients.filter((item) => item.type === 'bun');
  const sauceIngredients = ingredients.filter((item) => item.type === 'sauce');
  const mainIngredients = ingredients.filter((item) => item.type === 'main');

  const tabsIngredientsArr = [
    { title: 'Булки', list: bunIngredients },
    { title: 'Соусы', list: sauceIngredients },
    { title: 'Начинки', list: mainIngredients },
  ];

  return (
    <div>
      <section>
        <div className={styles.header}>
          <Tab value="bunRef" active={current === 'bunRef'} onClick={setActiveTab}>
            Булки
          </Tab>
          <Tab value="sauceRef" active={current === 'sauceRef'} onClick={setActiveTab}>
            Соусы
          </Tab>
          <Tab value="mainRef" active={current === 'mainRef'} onClick={setActiveTab}>
            Начинки
          </Tab>
        </div>
        <div className={styles.body}>
          <div className="custom-scroll">
            {tabsIngredientsArr.map((item) => (
              <div className={styles.grid} key={item.title}>
                <h2
                  className={styles.list}
                  ref={
                    item.title === 'Булки'
                      ? bunRef
                      : item.title === 'Соусы'
                      ? sauceRef
                      : mainRef
                  }
                >
                  {item.title}
                </h2>
                {item.list.map((ingredient) => (
                  <IngredientItem
                    key={ingredient._id}
                    item={ingredient}
                    text={ingredient.name}
                    price={ingredient.price}
                    thumbnail={ingredient.image}
                    type={ingredient.type}
                    handleClick={() => handleOpenModal(ingredient)}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
      {open && (
        <Modal onClose={handleCloseModal}>
          <IngredientDetails item={item} />
        </Modal>
      )}
    </div>
  );
});

BurgerIngredients.propTypes = {
  ingredients: PropTypes.arrayOf(ingredientType).isRequired,
};

export default BurgerIngredients;
