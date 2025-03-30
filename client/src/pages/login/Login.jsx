import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './login.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { loginFailure, loginStart, loginSuccess } from '../../redux/userSlice';
import Loading from '../../components/loading/Loading';
import axiosInstance from '../../lib/axiosInstance';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, message } = useSelector(state => state.user);
  
  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart())
    try {
      const res = await axiosInstance.post('auth/signin', {email, password});
      dispatch(loginSuccess(res.data))
      navigate('/');   
    } catch (error) {
      dispatch(loginFailure(error.response.data.message || 'Wrong credentials!'))
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
                {error && <p style={{ color: 'red' }}>{message}</p>}
                <button onClick={handleLogin}>{loading ? <Loading /> : 'Login'}</button>
            </div>
        </div>
    </div>
  );
};

export default Login;