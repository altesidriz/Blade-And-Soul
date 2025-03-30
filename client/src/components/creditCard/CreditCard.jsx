import styles from './creditCard.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import { loginSuccess } from '../../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import Loading from '../loading/Loading';
import axiosInstance from '../../lib/axiosInstance';




const CreditCard = ({ price, ncoins }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showInputs, setShowInputs] = useState(true);

  const currentUser = useSelector((state) => state.user.currentUser);

  const { _id, wallet } = currentUser;
  let finalWallet = wallet + ncoins;

  const validateCardDetails = () => {
    const today = new Date();
    const currentYear = today.getFullYear() % 100;
    const currentMonth = today.getMonth() + 1;

    setError(null); // Reset error state

    if (!/^\d{16}$/.test(cardNumber)) {
      setError('Card number must be 16 digits.');
      return false;
    }
    if (cardholderName.length < 2) {
      setError('Cardholder name must be at least 2 characters.');
      return false;
    }
    const [month, year] = expiry.split('/').map(Number);
    if (isNaN(month) || isNaN(year) || month < 1 || month > 12 || year < currentYear || (year === currentYear && month === currentMonth && month < currentMonth)) {
      setError('Invalid expiry date. Must be MM/YY and not in the past.');
      return false;
    }
    if (!/^\d{3}$/.test(cvv)) {
      setError('CVV must be 3 digits.');
      return false;
    }

    return true;
  };

  const handlePay = async () => {
    if (!validateCardDetails()) {
      return;
    }

    setLoading(true);
    setError(null);
    setShowInputs(false);

    setTimeout(async () => {
      try {
        const response = await axiosInstance.put(`users/${_id}`, { wallet: finalWallet });

        if (response.status === 200) {
          setSuccess('Payment successful!');
          dispatch(loginSuccess(response.data));
        } else {
          setError('Payment failed. Please try again.');
        }
      } catch (error) {
        setError('An error occurred. Please try again.');
      } finally {
        setLoading(false);
      }
    }, 3000);
  };

  const handleGoHome = () => {
    navigate('/');
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {success && <p style={{ color: 'green' }}>Payment successful!</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {showInputs && <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />}
        {showInputs && <input
          type="text"
          placeholder="Cardholder's Name"
          value={cardholderName}
          onChange={(e) => setCardholderName(e.target.value)}
        />}
        <div className={styles.bottom}>
          {showInputs && <input
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />}
          {showInputs && <input
            type="text"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />}
          {loading && <Loading />}
        </div>
      </div>
      {success && (
        <div>
          <button onClick={handleGoHome}>Go Home</button>
        </div>
      )}

      {!loading && !success && showInputs && (
        <button onClick={handlePay}>Payment ${price}</button>
      )}
    </div>
  );
};

export default CreditCard