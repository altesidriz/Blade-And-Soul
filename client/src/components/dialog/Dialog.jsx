// Dialog.jsx
import React, { useState } from 'react';
import Loading from '../loading/Loading';
import styles from './dialog.module.css';

const Dialog = ({ isOpen, onClose, onConfirm, message, successMessage, errorMessage }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            await onConfirm(); 
            setIsLoading(false);
            setFeedbackMessage(successMessage);
            setTimeout(() => {
                onClose(); 
            }, 3000);
        } catch (error) {
            setFeedbackMessage(errorMessage);
            setIsLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.dialogOverlay}>
            <div className={styles.dialogContent}>
                <p>{message}</p>
                {isLoading && <Loading />}
                {feedbackMessage && <p className={styles.feedback}>{feedbackMessage}</p>}
                {!isLoading && !feedbackMessage && (
                    <div className={styles.dialogButtons}>
                        <button onClick={handleConfirm}>Yes</button>
                        <button onClick={onClose}>Cancel</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dialog;