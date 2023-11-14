
import { Outlet } from 'react-router-dom';

import styles from './ingredients.module.css';


export const IngredientsPage = (): JSX.Element => {

  return (
    <main className={styles.main}>
      <Outlet />
    </main>
  );
};