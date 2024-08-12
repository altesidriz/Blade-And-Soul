import styles from './post.module.css';
import avatar from '../../assets/user/portrait.jpg';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Post = () => {
    const [user, setUser] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get('/api/users/find/');
      setUser(res.data);
    };
    fetchUser();
  }, {});
    return (
        <div className={styles.container}>
            <div className={styles.postContent}>
                <div className={styles.leftContent}>
                    <h3>Username</h3>
                    <div className={styles.avatar}>
                        <img src={avatar} alt="" />
                    </div>
                    <span>role</span>
                </div>
                <div className={styles.rightContent}>
                    <span>Posted on 12.2014</span>
                    <h1>Topic tittle</h1>
                    <p>
                        ...So, this slot is for oddities that have happened while playing Blade & Soul...
                        ...I was in a party playing in the Iron Monkey Dungeon...Meeting the Mechanizer, we always called the first Boss the Iron Monkey, and , after a successful final battle, all the party blipped out except for myself and one other player. We started talking about this and that, and as we did, she changed her costume... and then did it again.. and again... I was a beginner back then and had only a handful of outfits, and had not seen so many before... she continued her fashion show as we chatted. She must have had over 40 outfits, and I commented on and appraised them all... Went on for about 30 minutes...
                        ..It was a completely different experience from the normal dungeon events I had previously, and was fun... Never saw her again after that, and while I cannot recall her name, I have  never forgotten the experience, and how much fun we had....
                    </p>
                    <span className={styles.likes}>Likes</span>
                </div>
            </div>
        </div>
    );
};

export default Post;