import { useState } from 'react';
import styles from './signup.module.css';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault;
    try {
      const res = await axios
    } catch (error) {
      
    }
  }

  return (
    <div className={styles.container}>
        <div className={styles.loginForm}>
            <div className={styles.form}>
                <label htmlFor="userName">Username:</label>
                <input type="text" name='userName'  onChange={e=>setName(e.target.value)}/>
                <label htmlFor="email">Email:</label>
                <input type="email" name='email' onChange={e=>setEmail(e.target.value)}/>
                <label htmlFor="password">Password:</label>
                <input type="password" name='password' onChange={e=>setPassword(e.target.value)}/>
                <button onClick={handleSignup}>Register</button>
            </div>
        </div>
    </div>
  );
};

export default Signup;