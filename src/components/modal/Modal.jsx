import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import ModalOverlay from '../modal-overlay/ModalOverlay';
import PropTypes from 'prop-types';

import styles from './Modal.module.css';

const modalRoot = document.getElementById('modals');

const ModalComponent = ({ children }) => (
  <div className={styles.content}>
    {children}
  </div>
);

const Modal = ({ onClose, children, title }) => {
  useEffect(() => {
    const handleEscapeKey = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscapeKey);

    return () => {
      window.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  return ReactDOM.createPortal(
    <div>
      <div className={styles.modal}>
        <div className={styles.wrapper}>
          <div className={styles.title}>{title}</div>
          <button className={styles.closeButton} type='button' onClick={onClose}>
            <CloseIcon type='primary' />
          </button>
        </div>
        <ModalComponent>{children}</ModalComponent>
      </div>
      <ModalOverlay handleClick={onClose} />
    </div>,
    modalRoot,
);

};

Modal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;