import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './navbar.module.css';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { IoMenu } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import navLogo from '../../assets/navbar/nav-logo.png'

const Navbar = () => {
  const [arrow, setArrow] = useState(false);
  const [resMenu, setResMenu] = useState(false);
  const subMenuRef = useRef(null);
  const responsiveMenuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (arrow && subMenuRef.current && !subMenuRef.current.contains(event.target)) {
        setArrow(false);
      }

      if (resMenu && responsiveMenuRef.current && !responsiveMenuRef.current.contains(event.target) && !event.target.closest(`.${styles.responsiveBtn}`)) {
        setResMenu(false);
      }
    };

    const handleMouseLeave = () => {
      setArrow(false);
    };

    if (arrow || resMenu) {
      document.addEventListener('mousedown', handleClickOutside);
      if (subMenuRef.current) {
        subMenuRef.current.addEventListener('mouseleave', handleMouseLeave);
      }
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (subMenuRef.current) {
        subMenuRef.current.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [arrow, resMenu]);

  const closeMenus = () => {
    setResMenu(false);
    setArrow(false); // Also close the 'Game' submenu if open
  };

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
          {arrow && <div className={styles.subMenu} ref={subMenuRef}>
            <Link to='/races'>Races</Link>
            <Link to='#'>Classes</Link>
            <Link to='#'>Wiki</Link>
          </div>}
        </div>
        <div className={styles.responsiveBtn}>
          {resMenu ? <IoMdClose size={50} onClick={() => setResMenu(false)} /> 
          : <IoMenu size={50} onClick={() => setResMenu(true)} />}
        </div>
        {resMenu && <div className={styles.responsiveMenu} ref={responsiveMenuRef}>
          <a href="#"
            onClick={() => setArrow(!arrow)}
          >Game {!arrow && <IoIosArrowDown />} {arrow && <IoIosArrowUp />}  </a>
          {arrow && <div className={styles.respSub} ref={subMenuRef}>
            <Link to='/races' onClick={closeMenus}>Races</Link>
            <Link to='#' onClick={closeMenus}>Classes</Link>
            <Link to='#' onClick={closeMenus}>Wiki</Link>
          </div>}
          <Link to="/news" onClick={closeMenus}>News</Link>
          <Link to="/forum" onClick={closeMenus}>Forum</Link>
          <Link to="/support" onClick={closeMenus}>Support</Link>
          <Link to="/shop" onClick={closeMenus}>Shop</Link>
        </div>}

      </div>
    </div>
  );
};

export default Navbar;