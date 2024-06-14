import ProfileButtons from "../../pages/profile-buttons/profile-buttons";
import { ConnectForm } from "../../pages/connect-form/connect-form";
import { FC } from "react";

import styles from "./ConnectUs.module.scss";

export const ConnectUs: FC = () => {
  return (
    <main className={styles.main}>
      <div className={styles.buttons}>
        <ProfileButtons />
      </div>
      <div className={styles.feed}>
        <ConnectForm />
      </div>
    </main>
  );
};
