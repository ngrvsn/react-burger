import React from 'react';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import BurgerConstructor from '../../components/burger-constructor/BurgerConstructor';
import BurgerIngredients from '../../components/burger-ingredients/BurgerIngredients';


import styles from './home.module.css';

export const HomePage = () => {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}></h1>
      <DndProvider backend={HTML5Backend}>
        <BurgerIngredients />
        <BurgerConstructor />
      </DndProvider>
    </main>
  );
}