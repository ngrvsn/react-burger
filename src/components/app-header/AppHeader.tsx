import { FC } from 'react';
import { NavLink, Outlet, } from 'react-router-dom';
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './AppHeader.module.css';

const AppHeader: FC = () => {

  const setActiveLink = ({ isActive }: { isActive: boolean }) => {
    if (isActive) {
      return styles.active;
    } else {
      return styles.noActive;
    }
  };

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.container}>
          <NavLink to='/' className={setActiveLink}>
            <BurgerIcon type='primary' />
            <span className={styles.linkText}>Конструктор</span>
          </NavLink>

          <NavLink to='/profile/orders' className={setActiveLink}>
            <ListIcon type='secondary' />
            <span className={styles.linkText}>Лента заказов</span>
          </NavLink>

          <div className={styles.logo}>
            <Logo />
          </div>

          <NavLink to='/profile' className={setActiveLink}>
            <ProfileIcon type='primary' />

          </NavLink>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export { AppHeader };
