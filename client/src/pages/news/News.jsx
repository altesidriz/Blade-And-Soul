import styles from './news.module.css';
import NewsCard from '../../components/newsCard/NewsCard';
import { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
    const [news, setNews] = useState([]);

    useEffect(() => {
            const fetchData = async () => {
                  const res = await axios.get('/api/news/all');
                  setNews(res.data);
                };
                fetchData();
              }, []);

    return (
        <div className={styles.container}>
            <div className={styles.select}>
                <button>Select Category</button>
            </div>
            <div className={styles.cardList}>
                {news.map((data) => (<NewsCard key={data._id} data={data}/>))}
            </div>
        </div>
    );
};

export default News;