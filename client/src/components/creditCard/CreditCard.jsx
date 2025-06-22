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

  const [cardNumberRaw, setCardNumberRaw] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardholderName, setCardholderName] = useState('');
  const [expiryRaw, setExpiryRaw] = useState(''); // Raw expiry input
  const [expiry, setExpiry] = useState('');       // Formatted expiry
  const [cvv, setCvv] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [showInputs, setShowInputs] = useState(true);

  const currentUser = useSelector((state) => state.user.currentUser);

  const { _id, wallet } = currentUser;
  let finalWallet = wallet + ncoins;

  const formatCardNumber = (value) => {
    const cleanedValue = value.replace(/\D/g, '');
    const spacedValue = cleanedValue.replace(/(\d{4})(?=\d)/g, '$1 ');
    return spacedValue;
  };

  const handleCardNumberChange = (e) => {
    const rawValue = e.target.value.replace(/\s/g, '');
    setCardNumberRaw(rawValue);
    setCardNumber(formatCardNumber(rawValue));
  };

  const formatExpiryDate = (value) => {
    const cleanedValue = value.replace(/\D/g, '').slice(0, 4); // Allow max 4 digits
    if (cleanedValue.length >= 2) {
      return `${cleanedValue.slice(0, 2)}/${cleanedValue.slice(2)}`;
    }
    return cleanedValue;
  };

  const handleExpiryChange = (e) => {
    const rawValue = e.target.value.replace(/\//g, ''); // Remove existing slashes for raw value
    setExpiryRaw(rawValue);
    setExpiry(formatExpiryDate(rawValue));
  };

  const handleCardholderNameChange = (e) => {
    setCardholderName(e.target.value.toUpperCase()); // Allow spaces in name
  };

  const validateCardDetails = () => {
    const today = new Date();
    const currentYear = today.getFullYear() % 100;
    const currentMonth = today.getMonth() + 1;

    setError(null); 

    if (!/^\d{16}$/.test(cardNumberRaw)) {
      setError('Card number must be 16 digits.');
      return false;
    }
    if (cardholderName.trim().length < 2 || !/^[a-zA-Z\s]+$/.test(cardholderName)) {
      setError('Cardholder name must be at least 2 characters and contain only letters and spaces.');
      return false;
    }
    const [monthStr, yearStr] = expiry.split('/');
    const month = parseInt(monthStr, 10);
    const year = parseInt(yearStr, 10);

    if (isNaN(month) || isNaN(year) || month < 1 || month > 12 || year < currentYear || (year === currentYear && month < currentMonth)) {
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
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        {success && <p style={{ color: 'green' }}>Payment successful!</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {showInputs && <input
          type="text"
          placeholder="Card Number"
          value={cardNumber}
          onChange={handleCardNumberChange}
        />}
        {showInputs && <input
          type="text"
          placeholder="Cardholder's Name"
          value={cardholderName}
          onChange={handleCardholderNameChange}
        />}
        <div className={styles.bottom}>
          {showInputs && <input
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={handleExpiryChange}
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

export default CreditCard;