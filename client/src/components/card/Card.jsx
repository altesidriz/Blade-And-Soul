import shopCrad from '../../assets/shop/shopcard.png';
import ncoin from '../../assets/shop/ncoin.png';
import styles from './card.module.css';


const Card = ({item}) => {
    
    return (
        <div className={styles.card}>
            <img src={item.image} alt="" />
            <p>{item.name}</p>
            <div className={styles.price}>
                <img src={ncoin} alt="" />
                <span>{item.price}</span>
            </div>
            <div className={styles.back}>
                <p>{item.name}</p>
                <button>PURCHASE</button>
            </div>
        </div>
    );
};

export default Card;