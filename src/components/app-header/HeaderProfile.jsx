import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import styles from './LayoutPage.module.css';

const HeaderProfile = () => {
  const setActiveLink = ({ isActive, isNoActive }) => {
    if (isActive) {
      return styles.active;
    } else {
      return styles.noActive;
    }
  };
  
  return (
    <div className={styles.profile}>
      <Link to='/profile' className={setActiveLink}>Профиль</Link>
      <Link to='/profile/orders' className={setActiveLink}>История заказов</Link>
      <div className={styles.text}>
        В этом разделе вы можете изменить свои персональные данные
      </div>
      <Outlet />
    </div>
  );
};

export { HeaderProfile };
