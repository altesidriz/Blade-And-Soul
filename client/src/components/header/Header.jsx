import styles from './header.module.css';

const Header = () => {
  return (
    <div className={styles.container}>
      <div className={styles.logo}>
        <img src="/src/assets/header/ncsoft-seeklogo.svg" alt="" />
      </div>
      <span>Games</span>
    </div>
  );
};

export default Header;