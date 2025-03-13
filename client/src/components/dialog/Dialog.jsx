// Dialog.jsx
import React, { useState } from 'react';
import Loading from '../loading/Loading';
import styles from './dialog.module.css';

const Dialog = ({ isOpen, onClose, onConfirm, message }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const handleConfirm = async () => {
        setIsLoading(true);
        try {
            await onConfirm(); // Call the onConfirm function passed from Profile.jsx
            setFeedbackMessage("Picture deleted successfully!");
            setIsLoading(false);
            setTimeout(() => {
                onClose(); // Close the dialog after a short delay
            }, 1500);
        } catch (error) {
            setFeedbackMessage("Error deleting picture.");
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