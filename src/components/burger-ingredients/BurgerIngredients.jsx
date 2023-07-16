import React, { useState, useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components';
import { useDrag } from 'react-dnd';

import IngredientItem from '../ingredient-item/IngredientItem';
import Modal from '../modal/Modal';
import { useModal } from '../../hooks/useModal';
import IngredientDetails from '../ingredient-details/IngredientDetails';
import { loadIngredients } from '../../services/actions/menu';

import { MODAL_ADD_INGREDIENT, MODAL_DELETE_INGREDIENT } from '../../services/actions/menu';

import styles from './BurgerIngredients.module.css';

const BurgerIngredients = () => {
  const dispatch = useDispatch();
  const ingredient = useSelector((state) => state.ingredients.ingredient);
  const ingredients = useSelector((state) => state.ingredients.ingredients);
  const ingredientsRequest = useSelector((state) => state.ingredientsRequest);
  const ingredientsFailed = useSelector((state) => state.ingredientsFailed);
  const constructorBun = useSelector((state) => state.constructorItemsList.constructorBun);
  const constructorItems = useSelector((state) => state.constructorItemsList.constructorItems);
  const { isModalOpen, openModal, closeModal } = useModal();

  const [ingredientsCounters, setIngredientsCounters] = useState({});

  useEffect(() => {
    const updatedCounters = {};
    if (constructorBun.length > 0) {
      updatedCounters[constructorBun[0]._id] = 2;
    }
    constructorItems.forEach((item) => {
      updatedCounters[item._id] = (updatedCounters[item._id] || 0) + 1;
    });
    setIngredientsCounters(updatedCounters);
  }, [constructorItems, constructorBun]);

  useEffect(() => {
    dispatch(loadIngredients());
  }, [dispatch]);

  const updateIngredientCounter = (ingredientId, count) => {
    setIngredientsCounters((prevCounters) => ({
      ...prevCounters,
      [ingredientId]: count,
    }));
  };

  const [current, setCurrent] = useState('Булки');

  const clickOpenModal = (e) => {
    dispatch({ type: MODAL_ADD_INGREDIENT, ingredient: e });
    openModal();
  };

  const clickCloseModal = () => {
    dispatch({ type: MODAL_DELETE_INGREDIENT });
    closeModal();
  };

  const activeTab = (tab) => {
    setCurrent(tab);

    document.querySelector(`[data-title="${tab}"]`).scrollIntoView({
      behavior: 'smooth',
      inline: 'start',
    });
  };

  const onScrollActiveTab = () => {
    const observ = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrent(entry.target.title);
          }
        });
      },
      {
        root: document.querySelector('.custom-scroll'),
        threshold: [0.1, 0.5, 1],
      }
    );
    document.querySelectorAll('.custom-scroll > div').forEach((div) => observ.observe(div));
  };

  const tabLabels = ['Булки', 'Соусы', 'Начинки'];

  const tabsIngredientsSelect = tabLabels.map((label) => {
    const tabObj = {
      title: label,
      list: [],
    };
    if (label === 'Булки') {
      tabObj.list = ingredients.filter((item) => item.type === 'bun');
    } else if (label === 'Соусы') {
      tabObj.list = ingredients.filter((item) => item.type === 'sauce');
    } else {
      tabObj.list = ingredients.filter((item) => item.type === 'main');
    }
    return tabObj;
  });

  if (ingredientsFailed) {
    return <p>Ошибка получения данных</p>;
  } else if (ingredientsRequest) {
    return <p>Загрузка</p>;
  } else {
    return (
      <section>
        <div className={styles.header}>
          {tabLabels.map((item) => (
            <Tab key={item} value={item} active={current === item} onClick={activeTab}>
              {item}
            </Tab>
          ))}
        </div>
        <div className={styles.body}>
          <div className="custom-scroll" onScroll={onScrollActiveTab}>
            {tabsIngredientsSelect.map((wrapItem) => (
              <div className={styles.grid} key={wrapItem.title} title={wrapItem.title}>
                <h2 className={styles.title} data-title={wrapItem.title}>
                  {wrapItem.title}
                </h2>
                {wrapItem.list.map((item) => (
                  <IngredientItem
                    key={item._id}
                    item={item}
                    handleClick={() => clickOpenModal(item)}
                    id={item._id}
                    count={ingredientsCounters[item._id]}
                    updateIngredientCounter={updateIngredientCounter}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
        {isModalOpen && (
          <Modal title="Детали ингредиента" onClose={clickCloseModal}>
            <IngredientDetails item={ingredient} />
          </Modal>
        )}
      </section>
    );
  }
};

export default BurgerIngredients;
