import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileButtons from '../profile-buttons/profile-buttons';

import styles from './profile-orders.module.css';

export const ProfileOrdersPage = () => {

    return (
        <main className={styles.main}>
            <ProfileButtons />

        </main>
    );
};