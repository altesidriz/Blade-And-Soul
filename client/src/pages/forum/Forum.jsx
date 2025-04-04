import styles from './forum.module.css';
import { FiSearch } from "react-icons/fi";
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from "react-icons/md";
import { useEffect, useState } from 'react';
import PostCard from '../../components/postCard/PostCard';
import CreatePost from './createPost/CreatePost';
import { useSelector } from 'react-redux';
import axiosInstance from '../../lib/axiosInstance';

const Forum = () => {
  const [posts, setPosts] = useState([]);
  const [query, setQuery] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState(10);
  const [postModal, setPostModal] = useState(false);
  const currentUser = useSelector((state) => state.user.currentUser);


  const fetchPosts = async () => {
    try {
      const res = await axiosInstance.get('posts/paginate', {
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
  
  useEffect(() => {
    fetchPosts();
  }, [query, currentPage, limit]);


  const handleSearch = () => {
    setCurrentPage(1);
    setQuery(searchQuery);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const toggleModal = () => {
    setPostModal(!postModal);
  };


  return (
    <div className={styles.container}>
      {currentUser && <button style={{ width: '250px', alignSelf: 'end' }} onClick={toggleModal}>Create a topic</button>}
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
      {postModal && <CreatePost closeModal={toggleModal} refetchPosts={fetchPosts} />}
    </div>
  );
};

export default Forum;
