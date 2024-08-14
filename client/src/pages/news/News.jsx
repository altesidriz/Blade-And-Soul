import styles from './news.module.css';
import NewsCard from '../../components/newsCard/NewsCard';
import { useState, useEffect } from 'react';
import axios from 'axios';

const News = () => {
    const [news, setNews] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const res = await axios.get('/api/news/all');
            setNews(res.data);
        };
        fetchData();
    }, []);

    const handleCreate = () => {
        setOpenModal(false)
    }

    return (

        <div className={styles.container}>
            <div className={styles.select}>
                <button>Select Category</button>
                <button onClick={() => {setOpenModal(true)}}>Add a New</button>
            </div>
            <div className={styles.cardList}>
                {news.map((data) => (<NewsCard key={data._id} data={data} />))}
            </div>

            {openModal && <div className={styles.modal}>
                <div className={styles.modalImage}>
                    <div>Upload Image</div>
                    <button className={styles.modalButton}>Upload</button>
                </div>
                <div className={styles.modalText}>
                    <input type="text" name="" id="title" placeholder='Tittle ..' />
                    <input type="text" name="" id="title" placeholder='Category ..' />
                    <textarea type="text" name="" id="desc" placeholder='Description ..' />
                    <button className={styles.modalButton} onClick={handleCreate}>Create New</button>
                </div>
            </div>}
        </div>
    );
};

export default News;