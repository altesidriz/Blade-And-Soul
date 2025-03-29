import styles from './header.module.css';
import ncoin from '../../assets/shop/ncoin.png'
import { useDispatch } from 'react-redux';
import { useSelector } from "react-redux";

import { MdKeyboardArrowDown } from "react-icons/md";
import { FiMonitor } from "react-icons/fi";
import { MdPhoneAndroid } from "react-icons/md";
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../../redux/userSlice';
import axiosInstance from '../../lib/axiosInstance';

import ncsoftSeeklogo from './assets/header/ncsoft-seeklogo.svg';
import lineage from './assets/header/lineage.png';
import aion from './assets/header/aion.png';
import bns from './assets/header/bns.png';

const Header = () => {
  const [show, setShow] = useState(false);

  const { currentUser } = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = async () => {
    await axiosInstance.get('/api/auth/logout')
    dispatch(logout())
    navigate('/')
  }
  
  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <div className={styles.user1}>
          <div className={styles.logo}>
            <img src={ncsoftSeeklogo} alt="nc-logo" />
          </div>
          <span className={styles.games}
            onClick={() => setShow(!show)}
          >
            Games
            <MdKeyboardArrowDown color='#9c8e7f' />
          </span>
        </div>
        <div className={styles.user}>
          {currentUser && <div className={styles.walet}>
            <div className={styles.sepr}></div>
            <div className={styles.ncoin}>
              <img src={ncoin} alt="" />
            </div>
            <span>{currentUser.wallet}</span>
            <div className={styles.sepr}></div>
            <Link to={'/purchase'} className={styles.text}>PURCHASE</Link>
          </div>}
          <div className={styles.sepr}></div>
          {currentUser ? (
            <div>
              {<Link className={styles.text} to={`/profile/${currentUser._id}`}>{currentUser.name}</Link>}
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
            <img src={lineage} alt='lineage.png' />
            <div className={styles.cardText}>
              <MdPhoneAndroid />
              <FiMonitor />
              <span>Lineage II</span>
            </div>
          </div>
          <div className={styles.card2}>
            <img src={aion} alt='aion.png' />
            <div className={styles.cardText}>
              <MdPhoneAndroid />
              <FiMonitor />
              <span>Aion</span>
            </div>
          </div>
          <div className={styles.card3}>
            <img src={bns} alt='bns.png' />
            <div className={styles.cardText}>
              <MdPhoneAndroid />
              <FiMonitor />
              <span>Blade And Soul</span>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Header;