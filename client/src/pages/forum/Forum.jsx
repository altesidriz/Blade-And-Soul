import styles from './forum.module.css';
import { FiSearch } from "react-icons/fi";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import avatar from '../../assets/user/portrait.jpg';

const Forum = () => {
  return (
    <div className={styles.container}>
        <div className={styles.searchBar}>
            <input type="text" name="search" id=""  placeholder='Search topic...'/>
            <span><FiSearch /></span>
        </div>
        <div className={styles.postContent}>
            <div className={styles.paginationNum}>
              <span><MdKeyboardDoubleArrowLeft /></span>
                <span>1</span>
                <span>2</span>
                <span>3</span>
                <span>4</span>
                <span><MdKeyboardDoubleArrowRight /></span>
            </div>
            <div className={styles.postList}>
              <div className={styles.post}>
                <div className={styles.leftContent}>
                  <h3>Post title or topic title</h3>
                  <span>By User, created at</span>
                </div>
                <div className={styles.rightContent}>
                  <div className={styles.avatar}>
                    <img src={avatar} alt="" />
                  </div>
                  <h3>UserName</h3>
                </div>
              </div>

              <div className={styles.post}>
                <div className={styles.leftContent}>
                  <h3>Post title or topic title</h3>
                  <span>By User, created at</span>
                </div>
                <div className={styles.rightContent}>
                  <div className={styles.avatar}>
                    <img src={avatar} alt="" />
                  </div>
                  <h3>UserName</h3>
                </div>
              </div>

              <div className={styles.post}>
                <div className={styles.leftContent}>
                  <h3>Post title or topic title</h3>
                  <span>By User, created at</span>
                </div>
                <div className={styles.rightContent}>
                  <div className={styles.avatar}>
                    <img src={avatar} alt="" />
                  </div>
                  <h3>UserName</h3>
                </div>
              </div>

              <div className={styles.post}>
                <div className={styles.leftContent}>
                  <h3>Post title or topic title</h3>
                  <span>By User, created at</span>
                </div>
                <div className={styles.rightContent}>
                  <div className={styles.avatar}>
                    <img src={avatar} alt="" />
                  </div>
                  <h3>UserName</h3>
                </div>
              </div>


              <div className={styles.post}>
                <div className={styles.leftContent}>
                  <h3>Post title or topic title</h3>
                  <span>By User, created at</span>
                </div>
                <div className={styles.rightContent}>
                  <div className={styles.avatar}>
                    <img src={avatar} alt="" />
                  </div>
                  <h3>UserName</h3>
                </div>
              </div>



              <div className={styles.post}>
                <div className={styles.leftContent}>
                  <h3>Post title or topic title</h3>
                  <span>By User, created at</span>
                </div>
                <div className={styles.rightContent}>
                  <div className={styles.avatar}>
                    <img src={avatar} alt="" />
                  </div>
                  <h3>UserName</h3>
                </div>
              </div>
            </div>
        </div>
    </div>
  );
};

export default Forum;