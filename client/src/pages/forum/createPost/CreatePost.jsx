import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import styles from './createPost.module.css';

const CreatePost = ({ closeModal, refetchPosts }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const currentUser = useSelector((state) => state.user.currentUser);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/posts', {
                title,
                description,
                category,
                userId: currentUser._id,
            });
            closeModal();
            refetchPosts()
        } catch (error) {
            console.error('Error creating post:', error);
        }
    };


    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Create a New Post</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                    <textarea
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                    />
                    <button type="submit">Create Post</button>
                    <button type='button' onClick={closeModal}>Close</button>
                </form>
            </div>
        </div>
    );
};

export default CreatePost;