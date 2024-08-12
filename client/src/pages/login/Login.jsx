import { useState } from 'react';
import styles from './login.module.css';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/signin', {email, password});
      console.log(res.data);
      
    } catch (error) {
      
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