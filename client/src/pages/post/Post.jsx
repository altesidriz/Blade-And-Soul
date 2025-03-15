import styles from './post.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { fetchSuccess, like } from '../../redux/postSlice.js';
import { format } from 'timeago.js';
import { useEffect, useState } from 'react';
import { FaHeart, FaTrash, FaEdit } from 'react-icons/fa';
import Replies from '../../components/replies/Replies.jsx';
import Loading from '../../components/loading/Loading.jsx';
import Dialog from '../../components/dialog/Dialog.jsx';
import EditPost from './editPost/EditPost.jsx';

const Post = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentPost } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const path = useLocation().pathname.split('/')[2];
  const [channel, setChannel] = useState({});
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  // const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const postRes = await axios.get(`/api/posts/find/${path}`);
        const channelRes = await axios.get(`/api/users/find/${postRes.data.userId}`);
        setChannel(channelRes.data);
        dispatch(fetchSuccess(postRes.data));
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    await axios.put(`/api/users/like/${currentPost._id}`);
    dispatch(like(currentUser._id));
  };

  const openDeleteDialog = () => {
    setIsDeleteDialogOpen(true);
  };

  const closeDeleteDialog = () => {
    setIsDeleteDialogOpen(false);
    navigate('/forum');
  };

  const confirmDelete = async () => {
    try {
      await axios.delete(`/api/posts/${path}`);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const openEditModal = () => {
    setShowEdit(true);
  };
  const closeEditModal = () => {
    setShowEdit(false);
  };

  if (loading) {
    return <Loading />;
  }

  if (!currentPost) {
    return <p>Post not found.</p>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.postContent}>
        <div className={styles.leftContent}>
          <Link to={`/profile/${channel._id}`}>
            <h3>{channel.name}</h3>
          </Link>
          <div className={styles.avatar}>
            <Link to={`/profile/${channel._id}`}>
              <img src={channel.avatar} alt="" />
            </Link>
          </div>
          <span>{channel.role}</span>
        </div>
        {showEdit ? <EditPost closeModal={closeEditModal} /> :
          <div className={styles.rightContent}>
            {currentUser && currentPost.userId === currentUser._id && (
              <div className={styles.deleteButtons}>
                <span >
                  <FaEdit onClick={openEditModal} />
                </span>
                <span onClick={openDeleteDialog}>
                  <FaTrash />
                </span>
              </div>
            )}
            <span>Posted on {format(currentPost.createdAt)}</span>
            <h1>{currentPost.title}</h1>
            <p>{currentPost.description}</p>
            {currentUser && (
              <span className={styles.likes} onClick={handleLike}>
                <FaHeart />
                {currentPost.likes?.length}
              </span>
            )}
          </div>}
      </div>
      <div className={styles.replyContent}>
        <Replies postId={currentPost._id} />
      </div>
      <Dialog
        isOpen={isDeleteDialogOpen}
        onClose={closeDeleteDialog}
        onConfirm={confirmDelete}
        successMessage="Post deleted successfully!"
        errorMessage="Error deleting post."
        message="Are you sure you want to delete this post?"
      />
      {/* {isEditModalOpen && <EditPost closeModal={closeEditModal} />} */}
    </div>
  );
};

export default Post;