import styles from './news.module.css';
import NewsCard from '../../components/newsCard/NewsCard';
import CreateNew from './createNew/CreateNew';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axiosInstance from '../../lib/axiosInstance';

const News = () => {
    const [news, setNews] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [showPop, setShowPop] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const categories = ['All', 'Sales', 'Events', 'General', 'Patch Notes'];

    const currentUser = useSelector((state) => state.user.currentUser);

    const fetchData = async () => {
        try {
            let res;
            if (selectedCategory === ('All' || '')) {
                res = await axiosInstance.get('news/all');
            } else {
                res = await axiosInstance.get(`news/${selectedCategory}`);
            }
            setNews(res.data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedCategory]);

    const handleDeleteNews = (deletedId) => {
        setNews((prevNews) => prevNews.filter((item) => item._id !== deletedId));
    };

     useEffect(() => {
            setShowPop(true); 
            const timer = setTimeout(() => {
                setShowPop(false); // Hide the message after 3 seconds
            }, 4000);
            return () => clearTimeout(timer);
    }, []);

    return (

        <div className={styles.container}>
            <div className={styles.select}>
                {currentUser && currentUser.role === "Admin" && showPop &&(
                    <div className={styles.mobileMsg}>
                        <p>To add new content, please use a bigger screen.</p>
                    </div>
                )}

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
                {currentUser && currentUser.role === "Admin" ? <button className={styles.newBtn} onClick={() => { setOpenModal(true) }}>Add a New</button> : <></>}
            </div>
            <div className={styles.cardList}>
                {news.map((data) => (<NewsCard key={data._id} data={data} onDelete={handleDeleteNews} />))}
            </div>

            {openModal && <CreateNew setOpenModal={setOpenModal} fetchData={fetchData} />}
        </div>
    );
};

export default News;