import styles from './forum.module.css';
import { FiSearch } from "react-icons/fi";

const Forum = () => {
  return (
    <div className={styles.container}>
        <div className={styles.searchBar}>
            <input type="text" name="search" id=""  placeholder='Search topic...'/>
            <span><FiSearch /></span>
        </div>
        <div className={styles.postList}>
            <div className={styles.paginationNum}>
                <span>1</span>
                <span>1</span>
                <span>1</span>
                <span>1</span>
            </div>
        </div>
    </div>
  );
};

export default Forum;