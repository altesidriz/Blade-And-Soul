import styles from './creditCard.module.css';
import { useSelector } from 'react-redux';
import axios from "axios"
import { useState } from 'react';




const CreditCard = ({ price, ncoins }) => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const currentUser = useSelector((state) => state.user.currentUser);

  const { _id, wallet } = currentUser;
  let finalWallet = wallet + ncoins;

  const handlePay = async () => {

    setLoading(true);
    setError(null);

    try {
      const response = await axios.put(`/api/users/${_id}`, { wallet: finalWallet });

      if (response.status === 200) {
        setSuccess('Payment successful!');
      } else {
        setError('Payment failed. Please try again.');
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  }

  console.log(ncoins);
  console.log(wallet);
  

  return (

    <div className={styles.container}>
      <div className={styles.card}>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {success && <p style={{ color: 'green' }}>{success}</p>}
        <input type="text" name="" id="" placeholder='Card Number' />
        <input type="text" name="" id="" placeholder='Cardholders Name' />
        <div className={styles.bottom}>
          <input type="text" name="" id="" placeholder='MM/YY' />
          <input type="text" name="" id="" placeholder='CVV' />
        </div>
      </div>
      <button onClick={handlePay}>Payment ${price}</button>
    </div>
  )
}

export default CreditCard