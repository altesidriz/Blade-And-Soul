import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './editPost.module.css';
import { fetchSuccess } from '../../../redux/postSlice';
import axiosInstance from '../../../lib/axiosInstance';

const EditPost = ({ closeModal }) => {
    const { currentPost } = useSelector((state) => state.post);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (currentPost) {
            setTitle(currentPost.title);
            setDescription(currentPost.description);
            setCategory(currentPost.category);
        }
    }, [currentPost]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axiosInstance.put(`posts/${currentPost._id}`, {
                title,
                description,
                category,
            });
            dispatch(fetchSuccess(res.data));
            closeModal();
        } catch (error) {
            console.error('Error updating post:', error);
        }
    };

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <h2>Edit Post</h2>
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
                    <div className={styles.buttons}>
                        <button type="submit">Update Post</button>
                        <button type='button' onClick={closeModal}>Close</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditPost;