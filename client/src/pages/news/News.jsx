import styles from './news.module.css';
import NewsCard from '../../components/newsCard/NewsCard';
import CreateNew from './createNew/CreateNew';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const News = () => {
    const [news, setNews] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const categories = ['All', 'Sales', 'Events', 'General', 'Patch Notes'];
    
    const currentUser = useSelector((state) => state.user.currentUser);

    useEffect(() => {
        const fetchData = async () => {

            try {
                let res;
                if (selectedCategory === ('All' || '')) {
                    res = await axios.get('/api/news/all');
                } else {
                    res = await axios.get(`/api/news/${selectedCategory}`);
                }
                setNews(res.data);
            } catch (err) {

            }
        };

        fetchData();
    }, [selectedCategory]);

    const handleDeleteNews = (deletedId) => {
        setNews((prevNews) => prevNews.filter((item) => item._id !== deletedId));
    };
    
    return (

        <div className={styles.container}>
            <div className={styles.select}>
                <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                {currentUser && currentUser.role === "Admin" ? <button onClick={() => { setOpenModal(true) }}>Add a New</button> : <></>}
            </div>
            <div className={styles.cardList}>
                {news.map((data) => (<NewsCard key={data._id} data={data} onDelete={handleDeleteNews}/>))}
            </div>

            {openModal && <CreateNew setOpenModal={setOpenModal} />}
        </div>
    );
};

export default News;