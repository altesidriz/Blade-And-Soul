import axios from 'axios';
import styles from './forum.module.css';
import { FiSearch } from "react-icons/fi";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useEffect, useState } from 'react';
import PostCard from '../../components/postCard/PostCard';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get('/api/posts/paginate', {
          params: {
            page: currentPage,
            limit: limit,
            q: query
          }
        });
        setPosts(res.data.posts);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [query, currentPage, limit]);
  
  console.log(posts);
  
  const handleSearch = () => {
    setCurrentPage(1);
    setQuery(searchQuery);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className={styles.container}>
      <div className={styles.searchBar}>
        <input
          type="text"
          name="search"
          placeholder='Search topic...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span onClick={handleSearch}><FiSearch /></span>
      </div>
      <div className={styles.postContent}>
        <div className={styles.postList}>
          {posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))}
        </div>
        <div className={styles.paginationNum}>
          <span
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
          >
            <MdKeyboardDoubleArrowLeft />
          </span>
          {Array.from({ length: totalPages }, (_, index) => (
            <span
              key={index + 1}
              onClick={() => handlePageChange(index + 1)}
              className={index + 1 === currentPage ? styles.activePage : ''}
            >
              {index + 1}
            </span>
          ))}
          <span
            onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
          >
            <MdKeyboardDoubleArrowRight />
          </span>
        </div>
      </div>
    </div>
  );
};

export default Forum;
