import React, { useState, useRef } from 'react';
import styles from './support.module.css';
import Loading from '../../components/loading/Loading';

const Support = () => {
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);
    const formRef = useRef();

    const categories = ["Service Issues", "Game Update", "Bugs & Issues", "Items & Market", "General Discussion", "PvP", "PvE"];

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate email submission with setTimeout
        setTimeout(() => {
            setSuccess(true);
            setLoading(false);
            setCategory('');
            setMessage('');
        }, 3000); // 3 seconds

    };

    return (
        <div className={styles.container}>
            <div className={styles.supportContainer}>
                <h2>Submit a Support Request</h2>
                {!success && !loading && (
                    <form ref={formRef} onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <label htmlFor="category">Category:</label>
                            <select
                                id="category"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                                required
                            >
                                <option value="">Select Category</option>
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className={styles.formGroup}>
                            <label htmlFor="message">Message:</label>
                            <textarea
                                id="message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit">Send</button>
                    </form>
                )}
                {loading && <Loading />}
                {success && <p>Email sent successfully!</p>}
            </div>
        </div>
    );
};

export default Support;