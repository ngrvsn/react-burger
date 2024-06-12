import ProfileButtons from "../profile-buttons/profile-buttons";
import Feed from "../../components/feed-archive/feed/feed";
import React, { FC } from "react";

import styles from "./profile-orders.module.scss";

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
