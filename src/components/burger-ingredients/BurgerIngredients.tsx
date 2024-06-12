import React, { useState, createRef, useEffect, RefObject, FC } from "react";
import {
  Tab,
  CurrencyIcon,
  Counter,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { getIngredients } from "../../services/actions/ingredients";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import DraggableItem from "./BurgerIngredientsDrag";
import styles from "./BurgerIngredients.module.scss";
import { TIngredientProps } from "../../utils/types";
import { AppDispatch, RootState, useDispatch } from "../../utils/types";
import { TIngredientsState } from "../../services/reducers/ingredients";

const BurgerIngredients: FC = () => {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();
  const ingredientList = useSelector(
    (state: { [prop: string]: TIngredientsState }) =>
      state.ingredients.ingredientList
  );
  const ingredientListFailed = useSelector(
    (state: { [prop: string]: TIngredientsState }) =>
      state.ingredients.ingredientListFailed
  );
  const ingredientListRequest = useSelector(
    (state: { [prop: string]: TIngredientsState }) =>
      state.ingredients.ingredientListRequest
  );
  const burgerIngredientsList = useSelector(
    (state: RootState) => state.burgerConstructor.burgerIngredientsList
  );

  const [currentTab, setCurrentTab] = useState("bun");
  const bunRef = createRef();
  const sauceRef = createRef();
  const mainRef = createRef();
  const tabLabels = ["Булки", "Соусы", "Начинки"];

  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const activeTab = (tab: string): void => {
    setCurrentTab(tab);

    const element = document.querySelector(`[data-title="${tab}"]`);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        inline: "start",
      });
    }
  };

  useEffect(() => {
    const tabs = document.querySelectorAll(".tab");
    const handleClick = (event: Event) => {
      const tab = event.currentTarget as HTMLElement;
      if (tab.textContent !== null) {
        activeTab(tab.textContent);
      }
    };

    tabs.forEach((tab) => {
      tab.addEventListener("click", handleClick);
    });

    return () => {
      tabs.forEach((tab) => {
        tab.removeEventListener("click", handleClick);
      });
    };
  }, []);
  const onScrollActiveTab = () => {
    const observ = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry: any) => {
          if (entry.isIntersecting) {
            setCurrentTab(entry.target.title);
          }
        });
      },
      {
        root: document.querySelector(".custom-scroll") as Element,
        threshold: [0.1, 0.5, 1],
      }
    );
    document
      .querySelectorAll(".custom-scroll > div")
      .forEach((div: Element) => observ.observe(div));
  };

  useEffect(() => {
    onScrollActiveTab();
  }, [currentTab]);

  type TTabIngredient = {
    title: string;
    list: TIngredientProps[];
  };

  let tabsIngredientsSelect: TTabIngredient[] = [];

  if (ingredientList) {
    tabsIngredientsSelect = tabLabels.map((label) => {
      const tabObj: TTabIngredient = {
        title: label,
        list: [],
      };
      if (label === "Булки") {
        tabObj.list = ingredientList.filter((item) => item.type === "bun");
      } else if (label === "Соусы") {
        tabObj.list = ingredientList.filter((item) => item.type === "sauce");
      } else {
        tabObj.list = ingredientList.filter((item) => item.type === "main");
      }
      return tabObj;
    });
  }

  return (
    <section className={styles.sectionWrap}>
      <h2 className={styles.header}>Соберите бургер</h2>
      <section className={styles.sectionTabs}>
        <div className={styles.tabs} data-test-id="ingredients-menu">
          {tabLabels.map((label, index) => (
            <Tab
              key={index}
              value={label}
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
        <section
          onScroll={onScrollActiveTab}
          className={`${styles.scroller} custom-scroll`}
          data-test-id="ingredients"
        >
          {tabsIngredientsSelect.map((tab, index) => (
            <section
              key={index}
              ref={
                (index === 0
                  ? bunRef
                  : index === 1
                  ? sauceRef
                  : mainRef) as RefObject<HTMLElement>
              }
              className={styles.ingredientsWrapper}
              data-title={tab.title}
            >
              <p className={styles.tabTitle}>{tab.title}</p>

              {tab.list.map((ingredient) => (
                <DraggableItem
                  key={ingredient._id}
                  item={ingredient}
                  className={styles.ingredient}
                >
                  <Link
                    data-test-id="ingredients"
                    className={styles.link}
                    to={`/ingredients/${ingredient._id}`}
                    state={{ backgroundLocation: location }}
                  >
                    <div className={styles.counterWrapper}>
                      {burgerIngredientsList.filter(
                        (item) => item._id === ingredient._id
                      ).length > 0 && (
                        <Counter
                          count={
                            burgerIngredientsList.filter(
                              (item) => item._id === ingredient._id
                            ).length
                          }
                          size="default"
                          extraClass="m-1"
                        />
                      )}
                    </div>
                    <img src={ingredient.image} alt={ingredient.name} />
                    <p className={styles.ingredientDetail}>
                      <span className={styles.price}>{ingredient.price}</span>
                      <CurrencyIcon type="primary" />
                    </p>
                    <div className={styles.ingredientName}>
                      {ingredient.name}
                    </div>
                  </Link>
                </DraggableItem>
              ))}
            </section>
          ))}
        </section>
      )}
    </section>
  );
};

export default BurgerIngredients;
