import { Link } from 'react-router-dom';
import styles from './newsCard.module.css';
import { format } from 'timeago.js';
import { LiaEditSolid } from "react-icons/lia";
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from 'react-redux';


const categoryColors = {
    Sales: 'red',
    Events: 'yellow',
    General: 'white',
    'Patch Notes': 'green'
};

const NewsCard = ({ data }) => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const isAdmin = currentUser.role === 'Admin'
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
           {isAdmin && <div className={styles.buttons}>
                <span><LiaEditSolid size={25}/></span>
                <span><MdDeleteForever size={25}/></span>
            </div>}
        </div>
    )
}

export default NewsCard