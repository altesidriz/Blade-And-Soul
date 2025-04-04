import ncoin from '../../assets/shop/ncoin.png';
import styles from './card.module.css';
import { Link } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from 'react-redux';
import axiosInstance from '../../lib/axiosInstance';


const Card = ({ item, onDelete }) => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const isAdmin = currentUser.role === 'Admin';

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`items/${item._id}`);
            console.log(item._id);
            onDelete(item._id); // Notify the Shop component to update the list
        } catch (error) {
            console.error('Error deleting item:', error);
            // Handle error (e.g., show a message to the user)
        }
    };

    return (
        <div className={styles.card}>
            {isAdmin && (
                <span className={styles.deleteBtn} onClick={handleDelete}>
                    <MdDeleteForever size={20} />
                </span>
            )}
            <img src={item.image} alt="" />
            <p>{item.name}</p>
            <div className={styles.price}>
                <img src={ncoin} alt="" />
                <span>{item.price}</span>
            </div>
            <div className={styles.back}>
                <p>{item.name}</p>
                <Link to={`/item/${item._id}`}>PURCHASE</Link>
            </div>
        </div>
    );
};

export default Card;