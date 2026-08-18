import { useEffect, useState } from 'react';
import Card from '../../components/card/Card';
import styles from './shop.module.css';
import { useSelector } from 'react-redux';
import CreateItem from '../../components/createItem/CreateItem';
import axiosInstance from '../../lib/axiosInstance';



const Shop = () => {
  const currentUser = useSelector((state) => state.user.currentUser);

  const [items, setItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('featured');
  const categories = ['featured', 'cosmetics', 'suplies', 'service'];


  useEffect(() => {
    const fetchData = async () => {

      try {
        const res = await axiosInstance.get(`items/category/${selectedCategory}`);
        setItems(res.data);
      } catch (err) {

      }
    };

    fetchData();
  }, [selectedCategory]);

  const handleDeleteItem = (itemId) => {
    setItems((prevItems) => prevItems.filter((item) => item._id !== itemId));
  };

  return (
    <div className={styles.container}>
      {/* SEARCH BAR */}
      {/* <div className={styles.searchbar}>
        <div className={styles.searchIcon}><IoSearchSharp size={20} /></div>
        <input type="text" placeholder='Favor Coin' />
      </div> */}
      {/* CATEGORY MENU */}
      <div className={styles.categoryMenu}>
        {categories.map((category) => (
            <span key={category} onClick={() => setSelectedCategory(category)}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
            </span>
        ))}
      </div>
      {/* ITEMS CONTAINER */}
      <div className={styles.itemsContainer}>
        {items.map((item) => (<Card 
        key={item._id} 
        item={item} 
        onDelete={handleDeleteItem}/>))}
      </div>
      {currentUser.role === 'Admin' && <CreateItem/>}
    </div>
  );
};

export default Shop;