import styles from './profile.module.css';
import coverImg from '../../assets/user/cover.jpg';
import portrait from '../../assets/user/portrait.jpg';

const Profile = () => {
  return (
    <div className={styles.container}>
      <div className={styles.profileBanner}>
        <div className={styles.profileImg}>
          <img src={portrait} alt="" />
        </div>
        <div className={styles.bannerCover}>
          <div className={styles.coverImg}>
            <img src={coverImg} alt="" />
          </div>
          <div className={styles.userInfo}>
            <span>Player Name</span>
            <div>
              <span className={styles.role}>member</span>
              <span>joined at 04.08.2015</span>
            </div>
          </div>
        </div>

      </div>
      <div className={styles.playerActivity}>
        <div className={styles.galery}>
          <h3>Images</h3>
          <div className={styles.images}>
            <img src={portrait} alt="" />
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
      </div>
    </div>
  );
};

export default Profile;