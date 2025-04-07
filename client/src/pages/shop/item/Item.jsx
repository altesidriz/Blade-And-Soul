import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './item.module.css';
import ncoin from '../../../assets/shop/ncoin.png';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserWallet } from '../../../redux/userSlice';
import axiosInstance from '../../../lib/axiosInstance';
import Dialog from '../../../components/dialog/Dialog';
import Loading from '../../../components/loading/Loading';

const Item = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [number, setNumber] = useState(1);
  const userWallet = useSelector((state) => state.user.currentUser.wallet); 
  const currentUser = useSelector((state) => state.user.currentUser);
  const { _id } = currentUser;
  const dispatch = useDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState(null);
  const [feedbackType, setFeedbackType] = useState(null);

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`items/${id}`);
        setItem(response.data);
        setLoading(false);
      } catch (err) {
        setFeedbackMessage(err.message);
        setFeedbackType('error');
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  useEffect(() => {
    if (feedbackMessage) {
      const timeoutId = setTimeout(() => {
        setFeedbackMessage(null);
        setFeedbackType(null);
      }, 5000);

      return () => clearTimeout(timeoutId);
    }
  }, [feedbackMessage]);

  if (loading) {
    return <Loading />;
  }

  if (!item) {
    return <p className={styles.itemNotFound}>Item not found.</p>;
  }

  const incrementNumber = () => {
    setNumber((prevNumber) => prevNumber + 1);
  };

  const decrementNumber = () => {
    setNumber((prevNumber) => prevNumber - 1);
  };

  const handlePurchase = () => {
    const totalPrice = item.price * number;

    if (userWallet < totalPrice) {
      setFeedbackMessage('Insufficient funds!');
      setFeedbackType('error');
      return;
    }
    setIsDialogOpen(true);
  };

  const confirmPurchase = async () => {
    setIsDialogOpen(false); // Close the Dialog
    const totalPrice = item.price * number;

    dispatch(updateUserWallet(totalPrice));

    try {
      await axiosInstance.put(`users/${_id}`, {
        wallet: userWallet - totalPrice,
      });
      setFeedbackMessage('Purchase successful! Items are sent to you game account!');
      setFeedbackType('success');
    } catch (error) {
      console.error('Error updating wallet:', error);
      setFeedbackMessage('Purchase failed. Please try again.');
      setFeedbackType('error');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <img src={item.image} alt={item.name} />
      </div>
      <div className={styles.right}>
        <div className={styles.upper}>
          <span>{item.category}</span>
          <h1>{item.name}</h1>
          <div className={styles.price}>
            <span>
              <img src={ncoin} alt="" /> {item.price}
            </span>
          </div>
          <p>Details: Details about the item</p>
        </div>
        <div className={styles.bottom}>
          <p>Total Amount</p>
          <div className={styles.counter}>
            <span>{item.name}</span>
            <div>
              <button disabled={number <= 1} onClick={decrementNumber}>
                -
              </button>
              <p>{number}</p>
              <button onClick={incrementNumber}>+</button>
            </div>
          </div>
          <div className={styles.price}>
            <span>Total</span>
            <span>
              <img src={ncoin} alt="" /> {item.price * number}
            </span>
          </div>
          <button onClick={handlePurchase}>Purchase</button>
        </div>
      </div>
      {/* Feedback */}
      {feedbackMessage && (
        <p className={`${styles.feedback} ${styles[feedbackType]}`}>
          {feedbackMessage}
        </p>
      )}
      {/* Dialog Component */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={confirmPurchase}
        message="Are you sure you want to purchase items?"
        successMessage="Purchase successful!"
        errorMessage="Purchase failed. Please try again."
      />
    </div>
  );
};

export default Item;