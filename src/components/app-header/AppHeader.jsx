import React from 'react';
import { BurgerIcon, ListIcon, Logo, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './AppHeader.module.css';

function AppHeader() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <a href='#' className={styles.button}>
          <BurgerIcon type='primary' />
          <span className={styles.buttonTextOne}>Конструктор</span>
        </a>

        <a href='#' className={styles.ButtonTwo}>
          <ListIcon type='secondary' />
          <span className={styles.buttonText}>Лента заказов</span>
        </a>

        <div className={styles.logo}>
          <Logo />
        </div>

        <a href='#' className={styles.buttonThree}>
          <ProfileIcon type='secondary' />
          <span className={styles.buttonText}>Личный кабинет</span>
        </a>
      </div>
    </header>
  );
}

export default AppHeader;