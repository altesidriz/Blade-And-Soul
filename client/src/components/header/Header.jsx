import styles from './header.module.css';
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";
import axios from 'axios';

import { MdKeyboardArrowDown } from "react-icons/md";
import { FiMonitor } from "react-icons/fi";
import { MdPhoneAndroid } from "react-icons/md";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/userSlice';

const Header = () => {
  const [show, setShow] = useState(false);

  const { currentUser } = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = async () => {
    await axios.get('/api/auth/logout')
    dispatch(logout())
    navigate('/')
  }

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <div className={styles.user1}>
          <div className={styles.logo}>
            <img src="/src/assets/header/ncsoft-seeklogo.svg" alt="" />
          </div>
          <span className={styles.games}
            onClick={() => setShow(!show)}
          >
            Games
            <MdKeyboardArrowDown color='#9c8e7f' />
          </span>
        </div>
        <div className={styles.user}>
          <div className={styles.sepr}></div>
          {currentUser ? (
            <div>
              {<Link to={'/profile'}>{currentUser.name}</Link>}
            </div>) : (
            <Link className={styles.text} to='/signup'>
              Create Account
            </Link>)}
          <div className={styles.sepr}></div>
          {currentUser ? (
            <Link className={styles.text} to='/' onClick={handleLogout}>
              Logout
            </Link>
          ) : (<Link className={styles.text} to='/login'>
            Log In
          </Link>)}
        </div>
      </div>
      {show &&
        <div className={styles.cards}>
          <div className={styles.card}>
            <img src='/src/assets/header/lineage.png' alt='lineage.png' />
            <div className={styles.cardText}>
              <MdPhoneAndroid />
              <FiMonitor />
              <span>Lineage II</span>
            </div>
          </div>
          <div className={styles.card2}>
            <img src='/src/assets/header/aion.png' alt='lineage.png' />
            <div className={styles.cardText}>
              <MdPhoneAndroid />
              <FiMonitor />
              <span>Lineage II</span>
            </div>
          </div>
          <div className={styles.card3}>
            <img src='/src/assets/header/bns.png' alt='lineage.png' />
            <div className={styles.cardText}>
              <MdPhoneAndroid />
              <FiMonitor />
              <span>Lineage II</span>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Header;