import React from "react";
import TelegramIcon from "../../images/TelegramIcon.svg";

import styles from "./Contacts.module.scss";

export function Contacts(): JSX.Element {
  const openPdfInNewTab = () => {
    window.open("./lorem-ipsum.pdf", "_blank");
  };

  return (
    <main className={styles.main}>
      <div className={styles.contactsRow}>
        <div className={styles.contactWrapper}>
          <p className={styles.contactHeader}>Номер телефона: </p>
          <a href="tel:89876543210" className={styles.contactsText}>
            8 (987) 654 31-10
          </a>
        </div>
        <div className={styles.contactWrapper}>
          <p className={styles.contactHeader}>Почта: </p>
          <a href="mailto:info@randommail.ru" className={styles.contactsText}>
            info@randommail.ru
          </a>
        </div>

        <a
          href="https://t.me/randomtelegramname123"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.supportLink}
        >
          <img src={TelegramIcon} alt="telegram" className={styles.imageSize} />
          <span className={styles.supportLinkText}>Техническая поддержка</span>
        </a>
        <a onClick={openPdfInNewTab} className={styles.button}>
          Пользовательское соглашение
        </a>
      </div>
    </main>
  );
}
