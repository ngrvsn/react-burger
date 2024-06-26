import { FC } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  Logo,
  BurgerIcon,
  ListIcon,
  ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { ReactComponent as LogoSmall } from "../../images/smalllogo.svg";

import styles from "./AppHeader.module.scss";

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
          <NavLink to="/" className={setActiveLink}>
            <BurgerIcon type="primary" />
            <span className={styles.linkText}>Конструктор</span>
          </NavLink>

          <NavLink to="/feed" className={setActiveLink}>
            <ListIcon type="secondary" />
            <span className={styles.linkText}>Лента заказов</span>
          </NavLink>
          <NavLink to="/">
            <div className={styles.logo}>
              <Logo />
            </div>

            <div className={styles.logoSmall}>
              <LogoSmall />
            </div>
          </NavLink>

          <NavLink to="/profile" className={setActiveLink}>
            <div className={styles.profile}>
              <ProfileIcon type="primary" />
              <div className={styles.linkText}>Личный кабинет</div>
            </div>
          </NavLink>
        </div>
      </header>
      <Outlet />
    </div>
  );
};

export { AppHeader };
