import styles from './newsCard.module.css';
import cardImg from '../../assets/news/card1.jpg';

const NewsCard = ({data}) => {
    return (
        <div className={styles.card}>
            <div className={styles.cardImg}>
                <img src={data.image} alt="" />
            </div>
            <div className={styles.cardText}>
                <span>LIVE</span>
                <h3>{data.title}</h3>
                <div>
                    <span>{data.createdAt}</span>
                    <span>{data.category}</span>
                </div>
                <div className={styles.separator}></div>
                <a href="#">Read More</a>
            </div>
        </div>
    )
}

export default NewsCard