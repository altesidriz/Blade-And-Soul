import shopCrad from '../../assets/shop/shopcard.png';
import ncoin from '../../assets/shop/ncoin.png';
import styles from './card.module.css';


const Card = () => {
    return (
        <div className={styles.card}>
            <img src={shopCrad} alt="" />
            <p>Premium Wind Tiger Heart Upgrade Special Battle Potion (x125)</p>
            <div className={styles.price}>
                <img src={ncoin} alt="" />
                <span>3.000</span>
            </div>
            <div className={styles.back}>
                <p>Premium Wind Tiger Heart Upgrade Special Battle Potion (x125)</p>
                <button>PURCHASE</button>
            </div>
        </div>
    );
};

export default Card;