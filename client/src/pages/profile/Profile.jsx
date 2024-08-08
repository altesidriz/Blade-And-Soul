import styles from './profile.module.css';
import cover from '../../assets/user/cover.jpg';
import portrait from '../../assets/user/portrait.jpg';


const Profile = () => {
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
                dw
            </div>
        </div>
    );
};

export default Profile;