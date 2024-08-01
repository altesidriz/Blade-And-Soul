import styles from './header.module.css';
import { MdKeyboardArrowDown } from "react-icons/md";
import { FiMonitor } from "react-icons/fi";
import { MdPhoneAndroid } from "react-icons/md";
import { useState } from 'react';

const Header = () => {
  const [show, setShow] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.logoContainer}>
        <div className={styles.user1}>
          <div className={styles.logo}>
            <img src="/src/assets/header/ncsoft-seeklogo.svg" alt="" />
          </div>
          <span className={styles.games} 
          onClick={()=> setShow(true)}
         >
            Games
            <MdKeyboardArrowDown color='#9c8e7f' />
          </span>
        </div>
        <div className={styles.user}>
          <div className={styles.sepr}></div>
          <a className={styles.text} href='#'>
            Create Account
          </a>
          <div className={styles.sepr}></div>
          <a className={styles.text} href='#'>
            Log In
          </a>
        </div>
      </div>
      {show && 
      <div className={styles.cards}>
        <div className={styles.card}>
          <img src='/src/assets/header/lineage.png' alt='lineage.png' />
          <div className={styles.cardText}>
          <MdPhoneAndroid />
          <FiMonitor/>
          <span>Lineage II</span>
          </div>
        </div>
        <div className={styles.card2}>
          <img src='/src/assets/header/aion.png' alt='lineage.png' />
          <div className={styles.cardText}>
          <MdPhoneAndroid />
          <FiMonitor/>
          <span>Lineage II</span>
          </div>
        </div>
        <div className={styles.card3}>
          <img src='/src/assets/header/bns.png' alt='lineage.png' />
          <div className={styles.cardText}>
          <MdPhoneAndroid />
          <FiMonitor/>
          <span>Lineage II</span>
          </div>
        </div>
      </div>
      }
    </div>
  );
};

export default Header;