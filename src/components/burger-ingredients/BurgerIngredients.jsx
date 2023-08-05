import React, { useState, createRef, useEffect } from 'react';
import { Tab, CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import { getIngedients } from '../../services/actions/ingredients';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import DraggableItem from './BurgerIngredientsDrag';
import styles from './BurgerIngredients.module.css';
import Modal from '../modal/Modal';
import { useModal } from '../../hooks/useModal';
import IngredientDetails from '../ingredient-details/IngredientDetails';

const BurgerIngredients = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const ingredientList = useSelector(state => state.ingredients.ingredientList);
  const ingredientListFailed = useSelector(state => state.ingredients.ingredientListFailed);
  const ingredientListRequest = useSelector(state => state.ingredients.ingredientListRequest);
  const burgerIngredientsList = useSelector(state => state.burgerConstructor.burgerIngredientsList);
  const { isModalOpen } = useModal();
  const [selectedIngredient, setSelectedIngredient] = useState(null);

  const [currentTab, setCurrentTab] = useState("bun");
  const bunRef = createRef();
  const sauceRef = createRef();
  const mainRef = createRef();
  const tabLabels = ['Булки', 'Соусы', 'Начинки'];

  useEffect(() => {
    dispatch(getIngedients());
  }, [dispatch]);

  const activeTab = (tab) => {
    setCurrentTab(tab);
  
    const element = document.querySelector(`[data-title="${tab}"]`);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        inline: 'start',
      });
    }
  };
 




  useEffect(() => {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => activeTab(tab.textContent));
    });
    return () => {
      tabs.forEach((tab) => {
        tab.removeEventListener('click', () => activeTab(tab.textContent));
      });
    };
  }, []);

  const onScrollActiveTab = () => {
    const observ = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentTab(entry.target.title);
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

  useEffect(() => {
    onScrollActiveTab();
  }, [currentTab]);

  let tabsIngredientsSelect = [];
  if (ingredientList) {
    tabsIngredientsSelect = tabLabels.map((label) => {
      const tabObj = {
        title: label,
        list: [],
      };
      if (label === 'Булки') {
        tabObj.list = ingredientList.filter((item) => item.type === 'bun');
      } else if (label === 'Соусы') {
        tabObj.list = ingredientList.filter((item) => item.type === 'sauce');
      } else {
        tabObj.list = ingredientList.filter((item) => item.type === 'main');
      }
      return tabObj;
    });
  }



  return (
    <section className={styles.sectionWrap}>
      <h2 className={styles.header}>Соберите бургер</h2>
      <section className={styles.section}>
        <div className={styles.tabs}>
          {tabLabels.map((label, index) => (
            <Tab
              key={index}
              value={label === 'Булки' ? bunRef : label === 'Соусы' ? sauceRef : mainRef}
              active={currentTab === label.toLowerCase()}
              onClick={() => activeTab(label.toLowerCase())}
            >
              {label}
            </Tab>
          ))}
        </div>
      </section>

      {ingredientListRequest ? (
        <p className={styles.paragraph}>Загрузка</p>
      ) : ingredientListFailed ? (
        <p className={styles.paragraph}>Ошибка получения данных</p>
      ) : (
        <section onScroll={onScrollActiveTab} className={`${styles.scroller} custom-scroll`}>
          {tabsIngredientsSelect.map((tab, index) => (
            <section key={index} ref={index === 0 ? bunRef : index === 1 ? sauceRef : mainRef} className={styles.ingredientsWrapper} data-title={tab.title}>
              <p className={styles.tabTitle}>{tab.title}</p>

              {tab.list.map(ingredient => (
                <DraggableItem
                  key={ingredient._id}
                  text={ingredient.name}
                  item={ingredient}
                  type={ingredient.type}
                  className={styles.ingredient}
                >
                  <Link
                    className={styles.link}
                    to={`/ingredients/${ingredient._id}`}
                    state={{ backgroundLocation: location }}
                  >
                    <div className={styles.counterWrapper}>
                    {burgerIngredientsList.filter(item => item._id === ingredient._id).length > 0 && (
          <Counter count={burgerIngredientsList.filter(item => item._id === ingredient._id).length} size="default" extraClass="m-1" />
        )}
                    </div>
                    <img src={ingredient.image} alt={ingredient.name} />
                    <p className={styles.ingredientDetail}>
                      <span className={styles.price}>{ingredient.price}</span>
                      <CurrencyIcon type="primary" />
                    </p>
                    <div className={styles.ingredientName}>{ingredient.name}</div>
                  </Link>
                </DraggableItem>
              ))}
            </section>
          ))}
        </section>
      )}

      {isModalOpen && selectedIngredient && (
        <Modal  className={styles.ingredientTitle}>
          <IngredientDetails item={selectedIngredient} />
        </Modal>
      )}
    </section>
  );
}

export default BurgerIngredients;
