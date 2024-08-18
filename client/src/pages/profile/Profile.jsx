import { useEffect, useState } from 'react';

import styles from './profile.module.css';
import cover from '../../assets/user/cover.jpg';
import portrait from '../../assets/user/portrait.jpg';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {Link} from 'react-router-dom';

import { IoMdTime } from "react-icons/io";
import { format } from 'timeago.js';



const Profile = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const { name, role, avatar, pictures, createdAt } = currentUser;


    const [active ,setActive] = useState(0);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const  res = await axios.get(`/api/posts/users/${currentUser._id}`)

                setPosts(res.data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchData();
    }, [currentUser._id]);

    const handleClick = (index) => {
        setActive(index);
    };

    return (
        <div className={styles.container}>
            <div className={styles.cover}>
                <div className={styles.top}>
                    <img src={cover} alt="" />
                    <div className={styles.playerInfo}>
                        <h1>{name}</h1>
                        <h5>{role}</h5>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.profileImg}>
                        <img src={avatar} alt="" />
                    </div>
                    <div className={styles.joined}>
                        <span>JOINED</span>
                        <span>{format(createdAt)}</span>
                    </div>
                </div>
            </div>
            <div className={styles.playerContent}>
                <div className={styles.tabsContainer}>
                    <div
                    onClick={()=>handleClick(0)} 
                    className={active === 0 ? `${styles.tab} ${styles.activeTab}` : `${styles.tab}`}
                    >Images</div>
                    <div
                    onClick={()=>handleClick(1)} 
                    className={active === 1 ? `${styles.tab} ${styles.activeTab}` : `${styles.tab}`}
                    >Posts</div>
                </div>
                <div className={styles.tabsContent}>
                    <div className={active === 0 ? `${styles.imageContent} ${styles.activeContent}` : `${styles.imageContent}`}>
                        <div className={styles.galery}>
                            {pictures?.map((pic)=>(<img src={pic} alt="" />))}
                        </div>
                    </div>
                    <div className={active === 1 ? `${styles.postContent} ${styles.activeContent}` : `${styles.postContent}`}>
                        {posts.map((post)=>(
                            <div key={post._id} className={styles.post}>
                            <div className={styles.postAvatar}>
                                <img src={avatar} alt="" />
                            </div>
                            <div className={styles.postInfo}>
                                <Link to={''}><h3>{post.title}</h3></Link>
                                {/* <p>{post.}</p> */}
                                <span> <IoMdTime size={15}/>{format(post.createdAt)}</span>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;