import styles from './home.module.css';

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.carousel}>
          <img src="/src/assets/banner/carousel-img1.jpg" alt="" />
        <img src="/src/assets/banner/ashira_big.jpg" alt="" />
        <img src="/src/assets/banner/purple.jpg" alt="" />
        <img src="/src/assets/banner/infernal.jpg" alt="" />
      </div>
    </div>
  );
};

export default Home;