import React, { useEffect, FC } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/ModalOverlay';

import styles from './Modal.module.css';

const modalRoot = document.getElementById('modals');

interface ModalComponentProps {
  children: React.ReactNode;
}

const ModalComponent: FC<ModalComponentProps> = ({ children }) => (
  <div className={styles.content}>
    {children}
  </div>
);

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal: FC<ModalProps> = ({ onClose, children, title }) => {
  useEffect(() => {
    const handleEscapeKey = (el: KeyboardEvent): void => {
      if (el.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <div>
      <div data-testid="modal" className={styles.modal}>
        <div className={styles.wrapper}>
          <div className={styles.title}>{title}</div>
          <button className={styles.closeButton} type='button' onClick={onClose} data-testid="close-modal">
            <CloseIcon  type='primary' />
          </button>
        </div>
        <ModalComponent>{children}</ModalComponent>
      </div>
      <ModalOverlay handleClick={onClose} />
    </div>,
    modalRoot as Element
  );
};

export default Modal;
