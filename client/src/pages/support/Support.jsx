import React, { useState } from 'react';
import styles from './support.module.css'

const Support = () => {
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');

    const categories = ["Service Issues", "Game Update", "Bugs & Issues", "Items & Market", "General Discussion", "PvP", "PvE"];

    const handleSubmit = (e) => {
        e.preventDefault();
        //log to see output
        console.log("Category:", category);
        console.log("Message:", message);
        // API call here 
        setCategory('');
        setMessage('');
    };
    return (
        <div className={styles.container}>
            <div className={styles.supportContainer}>
                <h2>Submit a Support Request</h2>
                <form onSubmit={handleSubmit}>
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
            </div>
        </div>
    );
};

export default Support