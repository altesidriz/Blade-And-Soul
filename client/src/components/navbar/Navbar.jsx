import { useState } from 'react';
import styles from './navbar.module.css';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = () => {
  const [arrow, setArrow] = useState(false);

  return (
    <div className={styles.container}>
      <div className={styles.leftContent}>
        <div className={styles.logo}>
          <img src='/src/assets/navbar/nav-logo.png' />
        </div>
        <div className={styles.menu}>
            <a href="#" 
            onClick={()=> setArrow(!arrow)}
            >Game {!arrow && <IoIosArrowDown />} {arrow && <IoIosArrowUp />}  </a>
            <a href="#">News</a>
            <a href="#">Forum</a>
            <a href="#">Support</a>
            <a href="#">Shop</a>
            {arrow && <div className={styles.subMenu}>
              <span>Races</span>
              <span>Classes</span>
              <span>Wiki</span>
            </div>}
        </div>
      </div>
    </div>
  );
};

export default Navbar;