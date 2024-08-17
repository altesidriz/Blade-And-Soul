import axios from 'axios';
import styles from './postcard.module.css';
import { format } from 'timeago.js';

import { Link } from 'react-router-dom';
import avatar from '../../assets/user/portrait.jpg';
import { useEffect, useState } from 'react';



const PostCard = ({ post }) => {
    const [user, setUser] = useState({});

    useEffect(() => {

        const fetchUser = async () => {
            const res = await axios.get(`/api/users/find/${post.userId}`);
            setUser(res.data);
        };
        fetchUser();
    }, [post.userId]);

    return (
        <div className={styles.post}>
            <div className={styles.leftContent}>
                <Link to={`/post/${post._id}`}><h3>{post.title}</h3></Link>
                <span>By {user.name}, {format(post.createdAt)}</span>
            </div>
            <div className={styles.rightContent}>
                <div className={styles.avatar}>
                    <img src={avatar} alt="" />
                </div>
                <h3>{user.name}</h3>
            </div>
        </div>
    );
};

export default PostCard;