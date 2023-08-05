import React from 'react';
import { Outlet } from 'react-router-dom';

import styles from './ingredients.module.css';


export const IngredientsPage = () => {

  return (
    <main className={styles.main}>
      <Outlet />
    </main>
  );
};