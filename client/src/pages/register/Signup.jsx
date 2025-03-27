import { useState } from 'react';
import styles from './signup.module.css';
import { useNavigate } from 'react-router-dom';
import Loading from '../../components/loading/Loading';
import axiosInstance from '../../lib/axiosInstance';


const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError(''); // Reset error message

    // Client-side validation
    if (!name) {
      setError('Username is required');
      return;
    }

    if (!email) {
      setError('Email is required');
      return;
    }

    // Basic email pattern validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (!password) {
      setError('Password is required');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      setLoading(true);
      await axiosInstance.post('/api/auth/signup', { name, email, password });
      setLoading(false);
      navigate('/login');
    } catch (error) {
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('An unknown error occurred. Please try again.');
      }
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.loginForm}>
        {loading ? <Loading /> : <div className={styles.form}>
          <label htmlFor="userName">Username:</label>
          <input type="text" name='userName' onChange={e => setName(e.target.value)} />
          <label htmlFor="email">Email:</label>
          <input type="email" name='email' onChange={e => setEmail(e.target.value)} />
          <label htmlFor="password">Password:</label>
          <input type="password" name='password' onChange={e => setPassword(e.target.value)} />
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <button onClick={handleSignup}>Register</button>
        </div>}
      </div>
    </div>
  );
};

export default Signup;