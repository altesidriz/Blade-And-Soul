import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './item.module.css';
import ncoin from '../../../assets/shop/ncoin.png';
import { useSelector, useDispatch } from 'react-redux';
import { updateUserWallet } from '../../../redux/userSlice';
import axiosInstance from '../../../lib/axiosInstance';

const Item = () => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [number, setNumber] = useState(1);
  const userWallet = useSelector((state) => state.user.currentUser.wallet); 
  const currentUser = useSelector((state) => state.user.currentUser);
  const { _id } = currentUser;
  const dispatch = useDispatch(); // Get dispatch function

  console.log(id);


  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(`items/${id}`);
        setItem(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (!item) {
    return <p>Item not found</p>;
  }
  const incrementNumber = () => {
    setNumber((prevNumber) => prevNumber + 1);
  };

  const decrementNumber = () => {
    setNumber((prevNumber) => prevNumber - 1);
  };

  const handlePurchase = async () => { // Make handlePurchase async
    const totalPrice = item.price * number;

    if (userWallet < totalPrice) {
      alert("Insufficient funds!");
      return;
    }

    const confirmPurchase = window.confirm("Are you sure you want to purchase?");

    if (confirmPurchase) {
      dispatch(updateUserWallet(totalPrice));

      try {
        await axiosInstance.put(`users/${_id}`, {
          wallet: userWallet - totalPrice,
        });
        alert("Purchase successful!");
      } catch (error) {
        console.error("Error updating wallet:", error);
        alert("Purchase failed. Please try again.");
      }
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
            <span><img src={ncoin} alt="" /> {item.price}</span>
          </div>
          <p>Details: Details about the item</p>
        </div>
        <div className={styles.bottom}>
          <p>Total Amount</p>
          <div className={styles.counter}>
            <span>{item.name}</span>
            <div>
              <button disabled={number <= 1} onClick={decrementNumber}>-</button>
              <p>{number}</p>
              <button onClick={incrementNumber}>+</button>
            </div>
          </div>
          <div className={styles.price}>
            <span>Total</span>
            <span><img src={ncoin} alt="" /> {item.price * number}</span>
          </div>
          <button onClick={handlePurchase}>Purchase</button>
        </div>
      </div>
    </div>
  );
};

export default Item