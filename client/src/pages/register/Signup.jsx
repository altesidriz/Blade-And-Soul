import styles from './signup.module.css';

const Signup = () => {
  return (
    <div className={styles.container}>
        <div className={styles.loginForm}>
            <form action="#">
                <label htmlFor="userName">Username:</label>
                <input type="text" name='userName' />
                <label htmlFor="email">Email:</label>
                <input type="email" name='email' />
                <label htmlFor="password">Password:</label>
                <input type="password" name='password' />
                <button>Register</button>
            </form>
        </div>
    </div>
  );
};

export default Signup;