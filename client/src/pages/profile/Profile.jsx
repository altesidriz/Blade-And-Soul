import { useEffect, useState } from 'react';

import styles from './profile.module.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

import { IoMdTime } from "react-icons/io";
import { LiaEditSolid } from "react-icons/lia";
import { format } from 'timeago.js';
import UserModal from './userModal/UserModal';


const Profile = () => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const { name, role, avatar, pictures, createdAt, cover } = currentUser;
    const params = useParams();

    const isOwner = params.id === currentUser._id;

    const [active, setActive] = useState(0);
    const [posts, setPosts] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/api/posts/users/${currentUser._id}`)

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

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };


    return (
        <div className={styles.container}>
            <div className={styles.cover}>
                <div className={styles.top}>
                    {/* Edit Button */}
                    {isOwner && <LiaEditSolid size={25} className={styles.editBtn} onClick={openModal} />}
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
                        onClick={() => handleClick(0)}
                        className={active === 0 ? `${styles.tab} ${styles.activeTab}` : `${styles.tab}`}
                    >Images</div>
                    <div
                        onClick={() => handleClick(1)}
                        className={active === 1 ? `${styles.tab} ${styles.activeTab}` : `${styles.tab}`}
                    >Posts</div>
                </div>
                <div className={styles.tabsContent}>
                    <div className={active === 0 ? `${styles.imageContent} ${styles.activeContent}` : `${styles.imageContent}`}>
                        <div className={styles.galery}>
                            {pictures?.map((pic) => (<img src={pic} alt="" />))}
                        </div>
                    </div>
                    <div className={active === 1 ? `${styles.postContent} ${styles.activeContent}` : `${styles.postContent}`}>
                        {posts.map((post) => (
                            <div key={post._id} className={styles.post}>
                                <div className={styles.postAvatar}>
                                    <img src={avatar} alt="" />
                                </div>
                                <div className={styles.postInfo}>
                                    <Link to={`/post/${post._id}`}><h3>{post.title}</h3></Link>
                                    <span><IoMdTime size={15} />{format(post.createdAt)}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* Modal */}
            {isModalOpen && <UserModal
                isModalOpen={isModalOpen}
                closeModal={closeModal}
                currentUser={currentUser} />}
        </div>
    );
};

export default Profile;