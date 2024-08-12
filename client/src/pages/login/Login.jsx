import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart())
    try {
      const res = await axios.post('/api/auth/signin', {email, password});
      dispatch(loginSuccess(res.data))
      navigate('/');   
    } catch (error) {
      dispatch(loginFailure())
    }
  }

  return (
    <div className={styles.container}>
        <div className={styles.loginForm}>
            <div className={styles.form}>
                <label htmlFor="email">Email:</label>
                <input type="email" name='email' onChange={(e)=>setEmail(e.target.value)}/>
                <label htmlFor="password">Password:</label>
                <input type="password" name='password' onChange={(e)=>setPassword(e.target.value)}/>
                <button onClick={handleLogin}>Login</button>
            </div>
        </div>
    </div>
  );
};

export default Login;