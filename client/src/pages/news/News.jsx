import styles from './news.module.css';
import cardImg from '../../assets/news/card1.jpg';

const News = () => {
    return (
        <div className={styles.container}>
            <div className={styles.select}>
                <button>Select Category</button>
            </div>
            <div className={styles.cardList}>
                {/* SINGLE CARD */}
                <div className={styles.card}>
                    <div className={styles.cardImg}>
                        <img src={cardImg} alt="" />
                    </div>
                    <div className={styles.cardText}>
                        <span>LIVE</span>
                        <h3>Summer Starlight Packages</h3>
                        <div>
                            <span>July 23, 2024</span>
                            <span>Sales</span>
                        </div>
                        <div className={styles.separator}></div>
                        <p>A Refreshing Summer with the Latest Swimwear</p>
                        <a href="#">Read More</a>
                    </div>
                </div>
                {/* SINGLE CARD */}
                <div className={styles.card}>
                    <div className={styles.cardImg}>
                        <img src={cardImg} alt="" />
                    </div>
                    <div className={styles.cardText}>
                        <span>LIVE</span>
                        <h3>Summer Starlight Packages</h3>
                        <div>
                            <span>July 23, 2024</span>
                            <span>Sales</span>
                        </div>
                        <div className={styles.separator}></div>
                        <p>A Refreshing Summer with the Latest Swimwear</p>
                        <a href="#">Read More</a>
                    </div>
                </div>
                {/* SINGLE CARD */}
                <div className={styles.card}>
                    <div className={styles.cardImg}>
                        <img src={cardImg} alt="" />
                    </div>
                    <div className={styles.cardText}>
                        <span>LIVE</span>
                        <h3>Summer Starlight Packages</h3>
                        <div>
                            <span>July 23, 2024</span>
                            <span>Sales</span>
                        </div>
                        <div className={styles.separator}></div>
                        <p>A Refreshing Summer with the Latest Swimwear</p>
                        <a href="#">Read More</a>
                    </div>
                </div>
                {/* SINGLE CARD */}
                <div className={styles.card}>
                    <div className={styles.cardImg}>
                        <img src={cardImg} alt="" />
                    </div>
                    <div className={styles.cardText}>
                        <span>LIVE</span>
                        <h3>Summer Starlight Packages</h3>
                        <div>
                            <span>July 23, 2024</span>
                            <span>Sales</span>
                        </div>
                        <div className={styles.separator}></div>
                        <p>A Refreshing Summer with the Latest Swimwear</p>
                        <a href="#">Read More</a>
                    </div>
                </div>
                {/* SINGLE CARD */}
                <div className={styles.card}>
                    <div className={styles.cardImg}>
                        <img src={cardImg} alt="" />
                    </div>
                    <div className={styles.cardText}>
                        <span>LIVE</span>
                        <h3>Summer Starlight Packages</h3>
                        <div>
                            <span>July 23, 2024</span>
                            <span>Sales</span>
                        </div>
                        <div className={styles.separator}></div>
                        <p>A Refreshing Summer with the Latest Swimwear</p>
                        <a href="#">Read More</a>
                    </div>
                </div>
                {/* SINGLE CARD */}
                <div className={styles.card}>
                    <div className={styles.cardImg}>
                        <img src={cardImg} alt="" />
                    </div>
                    <div className={styles.cardText}>
                        <span>LIVE</span>
                        <h3>Summer Starlight Packages</h3>
                        <div>
                            <span>July 23, 2024</span>
                            <span>Sales</span>
                        </div>
                        <div className={styles.separator}></div>
                        <p>A Refreshing Summer with the Latest Swimwear</p>
                        <a href="#">Read More</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default News;