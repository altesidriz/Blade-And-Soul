import Carousel from '../../components/carousel/Carousel';
import styles from './home.module.css';
import cardImg from '../../assets/news/card1.jpg';
import bannerImg from '../../assets/banner/interim-home-define-style-destroyer.png';
import { IoIosKeypad } from "react-icons/io";
import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { format } from 'timeago.js';


const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const res = await axios.get('/api/news/all');
      setData(res.data);
    };
    fetchData();
  }, []);

  const curentNews = data.slice(0, 4);

  return (
    <div className={styles.container}>
      <Carousel />
      <div className={styles.cards}>
        {curentNews.map((i) => (
          <div key={i._id} className={styles.card}>
            <img src={i.image} alt="" />
            <div className={styles.cardInfo}>
              <span className={styles.title}>{i.title}</span>
              <div style={{ display: "flex", columnGap: "15px" }}>
                <span>{format(i.createdAt)}</span>
              </div>
            </div>
          </div>))}
      </div>
      <Link to={`/news`}><IoIosKeypad /> View More News</Link>
      <div className={styles.banner}>
        <h1>Define you Style</h1>
        <p>Unleash devastating aerial combos, swap martial arts stances, or reign down fury on your enemies. Explore your path.</p>
        <button>discover your path</button>
        <div className={styles.bannerVideo}>
          <video autoPlay loop={true} muted playsInline>
            <source src='https://cdn.ncwest.com/blade-and-soul/06052024-429BE0B7B39B5C83/videos/home/DualBlade-website-loop.mp4' />
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