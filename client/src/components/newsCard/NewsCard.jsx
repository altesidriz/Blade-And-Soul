import { Link } from 'react-router-dom';
import styles from './newsCard.module.css';
import { format } from 'timeago.js';

const categoryColors = {
    sales: 'red',
    events: 'yellow',
    general: 'white',
    'patch notes': 'green'
};

const NewsCard = ({ data }) => {
    const textColor = categoryColors[data.category];
    return (
        <div className={styles.card}>
            <div className={styles.cardImg}>
                <Link to={`/news/${data._id}`}>
                    <img src={data.image} alt="" />
                </Link>
            </div>
            <div className={styles.cardText}>
                <span>LIVE</span>
                <h3>{data.title}</h3>
                <div className={styles.cardTime}>
                    <span>{format(data.createdAt)}</span>
                    <span style={{ color: textColor }}>{data.category}</span>
                </div>
                <div className={styles.separator}></div>
                <Link to={`/news/${data._id}`}>Read More</Link>
            </div>
        </div>
    )
}

export default NewsCard