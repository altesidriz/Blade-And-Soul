import ncoin from '../../assets/shop/ncoin.png';
import styles from './card.module.css';
import { Link } from 'react-router-dom';
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from 'react-redux';
import axiosInstance from '../../lib/axiosInstance';
import { useState } from 'react';
import Dialog from '../dialog/Dialog';


const Card = ({ item, onDelete }) => {
    const currentUser = useSelector((state) => state.user.currentUser);
    const isAdmin = currentUser.role === 'Admin';
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const openDialog = () => {
        setIsDialogOpen(true);
    };

    const closeDialog = () => {
        setIsDialogOpen(false);
    };

    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`items/${item._id}`);
            onDelete(item._id);
        } catch (error) {
            console.error('Error deleting item:', error);
        }
    };

    return (
        <div className={styles.card}>
            {isAdmin && (
                <span className={styles.deleteBtn} onClick={openDialog} >
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
            <Dialog
                isOpen={isDialogOpen}
                onClose={closeDialog}
                onConfirm={handleDelete}
                message="Are you sure you want to delete the item?"
                successMessage="News article deleted successfully!"
                errorMessage="Failed to delete news article. Please try again."
            />
        </div>

    );
};

export default Card;