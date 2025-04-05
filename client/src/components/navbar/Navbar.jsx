import { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './navbar.module.css';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import navLogo from '../../assets/navbar/nav-logo.png'

const Navbar = () => {
  const [arrow, setArrow] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.leftContent}>
        <Link to='/'>
          <div className={styles.logo}>
            <img src={navLogo} alt='nav-logo' />
          </div>
        </Link>
        <div className={styles.menu}>
          <a href="#"
            onClick={() => setArrow(!arrow)}
          >Game {!arrow && <IoIosArrowDown />} {arrow && <IoIosArrowUp />}  </a>
          <Link to="/news">News</Link>
          <Link to="/forum">Forum</Link>
          <Link to="/support">Support</Link>
          <Link to="/shop">Shop</Link>
          {arrow && <div className={styles.subMenu}>
            <Link to='#'>Races</Link>
            <Link to='#'>Classes</Link>
            <Link to='#'>Wiki</Link>
          </div>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;