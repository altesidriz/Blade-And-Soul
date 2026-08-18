import { Link } from 'react-router-dom';
import styles from './newsCard.module.css';
import { format } from 'timeago.js';
import { MdDeleteForever } from "react-icons/md";
import { useSelector } from 'react-redux';
import axiosInstance from '../../lib/axiosInstance';
import Dialog from '../dialog/Dialog';
import { useState } from 'react';

const categoryColors = {
    Sales: 'red',
    Events: 'yellow',
    General: 'white',
    'Patch Notes': 'green'
};


const NewsCard = ({ data, onDelete }) => { // added onDelete prop.
    const currentUser = useSelector((state) => state.user.currentUser);
    const isAdmin = currentUser?.role === 'Admin';
    const textColor = categoryColors[data.category];
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const openDialog = () => {
        setIsDialogOpen(true);
    };
    
    const closeDialog = () => {
        setIsDialogOpen(false);
    };
    
    const handleDelete = async () => {
        try {
            await axiosInstance.delete(`news/${data._id}`);
            onDelete(data._id);
            closeDialog();
        } catch (error) {
            console.error('Error deleting news:', error);
        }
    };

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
            {isAdmin && (
                <div className={styles.buttons}>
                    <span onClick={openDialog}>
                        <MdDeleteForever size={25} />
                    </span>
                </div>
            )}
            <Dialog
                isOpen={isDialogOpen}
                onClose={closeDialog}
                onConfirm={handleDelete}
                message="Are you sure you want to delete this news article?"
                successMessage="News article deleted successfully!"
                errorMessage="Failed to delete news article. Please try again."
            />
        </div>
    );
};

export default NewsCard;