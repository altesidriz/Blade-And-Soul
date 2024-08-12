import axios from 'axios';
import styles from './forum.module.css';
import { FiSearch } from "react-icons/fi";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useEffect, useState } from 'react';
import PostCard from '../../components/postCard/PostCard';

const Forum = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get('/api/posts/all');
      setPosts(res.data);
    };
    fetchPosts();
  }, []);


  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input type="text" name="search" id="" placeholder='Search topic...' />
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
          {posts.map((post) => (
            <PostCard key={post._id} post={post}/>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forum;