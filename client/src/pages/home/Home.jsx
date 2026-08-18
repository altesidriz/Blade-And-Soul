import Carousel from '../../components/carousel/Carousel';
import styles from './home.module.css';
import bannerImg from '/assets/banner/interim-home-define-style-destroyer.png';
import { IoIosKeypad } from "react-icons/io";
import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { format } from 'timeago.js';
import Loading from '../../components/loading/Loading';
import { ErrorContext } from '../../context/ErrorContext';
import Error from '../../components/error/Error.jsx';
import axiosInstance from '../../lib/axiosInstance.js';


const Home = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const { appError, setAppError } = useContext(ErrorContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await axiosInstance.get('/api/news/all');
        console.log('News API Response:', res.data);
        // Проверка дали върнатите данни са наистина масив
        if (Array.isArray(res.data)) {
          setData(res.data);
        } else if (res.data && Array.isArray(res.data.news)) {
          // Ако бекендът връща обект от рода на { news: [...] }
          setData(res.data.news);
        } else {
          setData([]);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        setData([]); // Винаги нулирайте до празен масив при грешка
        setAppError('Something went wrong. Please try again later!');
      }
    };
    fetchData();
  }, []);

  const curentNews = Array.isArray(data) ? data.slice(0, 4) : [];

  // console.log(appError);

  const handleNavigate = () => {
    navigate('/races')
  }

  return (
    <div className={styles.container}>
      {appError && (
        <Error message={appError} onClose={() => setAppError(null)} isModal />
      )}
      <Carousel />
      <div className={styles.cards}>
        {loading ? (
          <Loading />
        ) : curentNews.length > 0 ? (
          curentNews.map((i) => (
            <Link to={`/news/${i._id}`} key={i._id} className={styles.card}>
              <img src={i.image} alt={i.title} />
              <div className={styles.cardInfo}>
                <span className={styles.title}>{i.title}</span>
                <div style={{ display: "flex", columnGap: "15px" }}>
                  <span>{format(i.createdAt)}</span>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <p>No news available at the moment.</p> // Показва, че няма намерени новини или заявката е върнала празен масив
        )}
      </div>
      <Link to={`/news`}><IoIosKeypad /> View More News</Link>
      <div className={styles.banner}>
        <h1>Define your Style</h1>
        <p>Unleash devastating aerial combos, swap martial arts stances, or reign down fury on your enemies. Explore your path.</p>
        <button onClick={handleNavigate}>discover your path</button>
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
          <img src="/assets/banner/carousel-img1.jpg" alt="" />
        <img src="/assets/banner/ashira_big.jpg" alt="" />
        <img src="/assets/banner/purple.jpg" alt="" />
        <img src="/assets/banner/infernal.jpg" alt="" />
      </div> */}
