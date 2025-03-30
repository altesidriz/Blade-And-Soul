import Reply from '../reply/Reply';
import styles from './replies.module.css';
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import axiosInstance from '../../lib/axiosInstance';

const Replies = ({ postId }) => {
    const { currentUser } = useSelector((state) => state.user);
    const [replies, setReplies] = useState([]);
    const [currentReply, setCurrentReply] = useState('');
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetchReplies = async () => {
            try {
                const res = await axiosInstance.get(`/api/replies/${postId}`);
                setReplies(res.data);
            } catch (err) { }
        };
        fetchReplies();
    }, [postId]);


    const handleReply = async () => {
        if (!currentReply) {
            setError(true)
        }
        try {
            const res = await axiosInstance.post('replies', {
                userId: currentUser._id,
                postId: postId,
                description: currentReply,
            });
            setReplies(prevReplies => [...prevReplies, res.data]);
            setCurrentReply('');
        } catch (err) {
            console.log("Failed add reply");
            
        }
    };


    return (
        <div className={styles.container}>
                {error && <div className={styles.error}>You can't reply with empty text</div>}
            {currentUser &&<div className={styles.newRep}>
                <div className={styles.imgContainer}>
                    <img src={currentUser?.avatar} alt="" />
                </div>
                <textarea type="textarea"
                    placeholder='Reply...'
                    value={currentReply}
                    onChange={(e) => { setCurrentReply(e.target.value) }} />
                <button onClick={handleReply}>Reply</button>
            </div>}
            {replies.map(reply => (
                <Reply key={reply._id} reply={reply} />
            ))}
        </div>
    )
}





export default Replies