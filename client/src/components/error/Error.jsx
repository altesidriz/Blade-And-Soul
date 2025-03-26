import React from 'react';
import styles from './error.module.css'; // Create Error.module.css

const Error = ({ message, onClose, isModal }) => {
    return (
        <div className={isModal ? styles.modalOverlay : styles.errorPage}>
          <div className={isModal ? styles.modal : styles.errorContent}>
            <h2>Error</h2>
            <p>{message}</p>
            {onClose && <button className={styles.errBtn} onClick={onClose}>Close</button>}
          </div>
        </div>
      );
}

export default Error;