import React from 'react';
import PropTypes from 'prop-types';

import styles from './ModalOverlay.module.css';

type TOverlayProp = {
  handleClick: () => void;
};

const ModalOverlay = ({handleClick}: TOverlayProp) => {
  return (
    <div className={styles.overlay} onClick={handleClick}></div>
  )
}

ModalOverlay.propTypes = {
  handleClick: PropTypes.func.isRequired,
};

export default ModalOverlay;
