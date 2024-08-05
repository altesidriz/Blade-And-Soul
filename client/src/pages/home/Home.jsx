import Carousel from '../../components/carousel/Carousel';
import styles from './home.module.css';
import cardImg from '../../assets/news/card1.jpg';
import bannerImg from '../../assets/banner/interim-home-define-style-destroyer.png';
import { IoIosKeypad } from "react-icons/io";

const Home = () => {
  return (
    <div className={styles.container}>
      <Carousel />
      <div className={styles.cards}>
        <div className={styles.card}>
          <img src={cardImg} alt="" />
          <div className={styles.cardInfo}>
            <span className={styles.title}>Title</span>
            <div style={{ display: "flex", columnGap: "15px" }}>
              <span>Date</span>
              <span>Category</span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <img src={cardImg} alt="" />
          <div className={styles.cardInfo}>
            <span className={styles.title}>Title</span>
            <div style={{ display: "flex", columnGap: "15px" }}>
              <span>Date</span>
              <span style={{ background: "red" }}>Category</span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <img src={cardImg} alt="" />
          <div className={styles.cardInfo}>
            <span className={styles.title}>Title</span>
            <div style={{ display: "flex", columnGap: "15px" }}>
              <span>Date</span>
              <span>Category</span>
            </div>
          </div>
        </div>

        <div className={styles.card}>
          <img src={cardImg} alt="" />
          <div className={styles.cardInfo}>
            <span className={styles.title}>Title</span>
            <div style={{ display: "flex", columnGap: "15px" }}>
              <span>Date</span>
              <span>Category</span>
            </div>
          </div>
        </div>

      </div>
      <button><IoIosKeypad /> View More News</button>
      <div className={styles.banner}>
        <h1>Define you Style</h1>
        <p>Unleash devastating aerial combos, swap martial arts stances, or reign down fury on your enemies. Explore your path.</p>
        <button>discover your path</button>
        <div className={styles.bannerVideo}>
          <video autoPlay loop={true} muted playsInline>
            {/* <source src='https://cdn.ncwest.com/blade-and-soul/06052024-429BE0B7B39B5C83/videos/home/DualBlade-website-loop.mp4' /> */}
          </video>
        </div>
        <div className={styles.character}>
          <img src={bannerImg} alt="" style={{ objectFit: "cover" }} />
        </div>
      </div>
    </div>
  );
};

export default Home;



{/* <div className={styles.carousel}>
          <img src="/src/assets/banner/carousel-img1.jpg" alt="" />
        <img src="/src/assets/banner/ashira_big.jpg" alt="" />
        <img src="/src/assets/banner/purple.jpg" alt="" />
        <img src="/src/assets/banner/infernal.jpg" alt="" />
      </div> */}