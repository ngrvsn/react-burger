import ProfileButtons from '../profile-buttons/profile-buttons';
import Feed from '../../components/feed-archive/feed/feed';
import React, { FC } from 'react';
import { useLocation } from 'react-router-dom';

import styles from './profile-orders.module.css';

export const ProfileOrdersPage: FC = () => {
  return (
    <main className={styles.main}>
      <div className={styles.buttons}>
        <ProfileButtons />
      </div>
      <div className={styles.feed}>
        <Feed />
      </div>
    </main>
  );
};
