import React, { useState } from "react";
import TelegramIcon from "../../images/TelegramIcon.svg";
import { MapComponent } from "../../services/map/map";

import styles from "./Contacts.module.scss";

export function Contacts(): JSX.Element {
  const [showMapModal, setShowMapModal] = useState(false);

  const openPdfInNewTab = () => {
    window.open("./lorem-ipsum.pdf", "_blank");
  };

  const openMapModal = () => {
    setShowMapModal(true);
  };

  const closeMapModal = () => {
    setShowMapModal(false);
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

        <div className={styles.lastElements}>
          <a onClick={openPdfInNewTab} className={styles.button}>
            Пользовательское соглашение
          </a>

          <a onClick={openMapModal} className={styles.button}>
            Мы на карте
          </a>

          {showMapModal && (
            <div className={styles.modal}>
              <div className={styles.modalContent}>
                <MapComponent />
                <a onClick={closeMapModal} className={styles.closeButton}>
                  Закрыть карту
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
