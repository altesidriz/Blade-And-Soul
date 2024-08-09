import { useState } from 'react';

import styles from './profile.module.css';
import cover from '../../assets/user/cover.jpg';
import portrait from '../../assets/user/portrait.jpg';

import { IoMdTime } from "react-icons/io";


const Profile = () => {

    const [active ,setActive] = useState(0);
    // const [auth, isAuth ] = useState(true);

    const handleClick = (index) => {
        setActive(index);
    };

    return (
        <div className={styles.container}>
            <div className={styles.cover}>
                <div className={styles.top}>
                    <img src={cover} alt="" />
                    <div className={styles.playerInfo}>
                        <h1>Cricket Lia</h1>
                        <h5>MEMBER</h5>
                    </div>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.profileImg}>
                        <img src={portrait} alt="" />
                    </div>
                    <div className={styles.joined}>
                        <span>JOINED</span>
                        <span>26 October 2014</span>
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
                            <img src={portrait} alt="" />
                            <img src={portrait} alt="" />
                            <img src={portrait} alt="" />
                            <img src={portrait} alt="" />
                            <img src={portrait} alt="" />
                            <img src={portrait} alt="" />
                            <img src={portrait} alt="" />
                            <img src={portrait} alt="" />
                        </div>
                    </div>
                    <div className={active === 1 ? `${styles.postContent} ${styles.activeContent}` : `${styles.postContent}`}>
                        <div className={styles.post}>
                            <div className={styles.postAvatar}>
                                <img src={portrait} alt="" />
                            </div>
                            <div className={styles.postInfo}>
                                <h3>Tittle of the post</h3>
                                <p>The post comments</p>
                                <span> <IoMdTime size={15}/> 26.Oct.2024</span>
                            </div>
                        </div>
                        <div className={styles.post}>
                            <div className={styles.postAvatar}>
                                <img src={portrait} alt="" />
                            </div>
                            <div className={styles.postInfo}>
                                <h3>Tittle of the post</h3>
                                <p>The post comments</p>
                                <span> <IoMdTime size={15}/> 26.Oct.2024</span>
                            </div>
                        </div>
                        <div className={styles.post}>
                            <div className={styles.postAvatar}>
                                <img src={portrait} alt="" />
                            </div>
                            <div className={styles.postInfo}>
                                <h3>Tittle of the post</h3>
                                <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa fugit tenetur odit voluptate debitis id ipsum, praesentium nesciunt soluta placeat laudantium sapiente, reiciendis maxime mollitia nihil earum voluptatum accusamus suscipit dolorum, iste temporibus quibusdam odio! Culpa quia laboriosam fuga consectetur necessitatibus possimus quam, odio corrupti dolorem sint nisi sequi, dicta a? Molestiae dignissimos veniam nihil eum corrupti debitis. Iusto consequuntur aspernatur quidem debitis ratione dolorum, earum delectus ullam cupiditate nisi, sunt atque soluta id corrupti labore aliquid? Voluptatem quis nulla illum at nesciunt? Mollitia modi velit, placeat, atque itaque nihil vero repellat quidem voluptatum dolorum blanditiis sapiente alias quia commodi minima voluptas veniam? Laboriosam fugiat possimus unde placeat culpa non officiis facere minus rerum sed! Officiis cumque pariatur minima quas itaque veniam similique quaerat consectetur nobis suscipit quos ipsa quisquam sequi maiores eveniet reiciendis, nihil vero quidem cupiditate voluptatibus nostrum error? Eum cum voluptatibus minus saepe eaque velit rem eius!</p>
                                <span> <IoMdTime size={15}/> 26.Oct.2024</span>
                            </div>
                        </div>
                        <div className={styles.post}>
                            <div className={styles.postAvatar}>
                                <img src={portrait} alt="" />
                            </div>
                            <div className={styles.postInfo}>
                                <h3>Tittle of the post</h3>
                                <p>The post comments</p>
                                <span> <IoMdTime size={15}/> 26.Oct.2024</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;