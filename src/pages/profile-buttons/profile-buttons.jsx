import React from 'react';
import { NavLink } from 'react-router-dom';
import { useNavigate, useMatch } from "react-router-dom";
import { useDispatch} from 'react-redux';
import { signOut } from '../../services/actions/users';

import styles from './profile-buttons.module.css';

const ProfileButtons = () => {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const unlogin = async (el) => {
    el.preventDefault();
    await signOut(dispatch).then((success) => {
      if (success) {
        navigate('/login', { replace: true });
      }
    })
  }

  const navLinkActiveStyle = `${styles.navLink} ${styles.navLinkActive}`;
  const navLinkInactiveStyle = `${styles.navLink} ${styles.navLinkInactive}`;

  return (
    <section className={styles.wrapper}>
      <div>
        <div className={styles.buttons}>
          <NavLink
            to={{ pathname: `/profile` }}
            end
            className={({ isActive }) => isActive ? navLinkActiveStyle : navLinkInactiveStyle}
          >
            Профиль
          </NavLink>
        </div>
        <div className={styles.buttons}>
          <NavLink
            to={{ pathname: `/profile/orders` }}
            end
            className={({ isActive }) => isActive ? navLinkActiveStyle : navLinkInactiveStyle}
          >
            История заказов
          </NavLink>
        </div>
        <div className={styles.buttons}>
          <a href={"/"}
            className={navLinkInactiveStyle}
            onClick={unlogin}
          >
            Выход
          </a>
        </div>
      </div>
  
  
      <div className={styles.text}>
        {useMatch('/profile') ? <>В этом разделе вы можете изменить <br /> свои персональные данные</> : null}
      </div>
    </section>
  );
};

export default ProfileButtons;
