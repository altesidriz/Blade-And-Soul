import Card from '../../components/card/Card';
import styles from './shop.module.css';
import { IoSearchSharp } from "react-icons/io5";


const Shop = () => {
  return (
    <div className={styles.container}>
      {/* SEARCH BAR */}
      <div className={styles.searchbar}>
        <div className={styles.searchIcon}><IoSearchSharp size={20}/></div>
        <input type="text" placeholder='Favor Coin'/>
      </div>
      {/* CATEGORY MENU */}
      <div className={styles.categoryMenu}>
        <span>Featured</span>
        <span>Cosmetics</span>
        <span>Suplies</span>
        <span>Service</span>
      </div>
      {/* ITEMS CONTAINER */}
      <div className={styles.itemsContainer}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  );
};

export default Shop;