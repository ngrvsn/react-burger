import React, { useState, useEffect } from 'react';
import AppHeader from '../app-header/AppHeader';
import BurgerConstructor from '../burger-constructor/BurgerConstructor';
import BurgerIngredients from '../burger-ingredients/BurgerIngredients';

import styles from './App.module.css';

const URL_DATA = 'https://norma.nomoreparties.space/api/ingredients';

const App = () => {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(URL_DATA);
      if (!response.ok) {
        throw new Error(`Ошибка ${response.status}`);
      }
      const json = await response.json();
      setData(json.data);
    } catch (error) {
      console.error('Произошла ошибка', error);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  if (isLoading) {
    return <div>Загрузка</div>;
  }

  if (hasError) {
    return <div>Произошла ошибка</div>;
  }

  const bun = data.find((item) => item.name.includes('булка'));
  const newData = data.filter((item) => !item.name.includes('булка'));

  return (
    <div className={styles.app}>
      <AppHeader className={styles.header} />
      <p className={styles.paragraph}>Соберите бургер</p>
      <main className={styles.main}>
        <BurgerIngredients ingredients={data} />
        <BurgerConstructor bun={bun} listElements={newData} />
      </main>
    </div>
  );
  
};

export default App;
