import styles from './post.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, Link } from 'react-router-dom';
import axios from 'axios';
import { fetchSuccess, like } from '../../redux/postSlice.js';
import { format } from 'timeago.js';
import { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';
import Replies from '../../components/replies/Replies.jsx';
import Loading from '../../components/loading/Loading.jsx';

const Post = () => {
  const { currentUser } = useSelector((state) => state.user);
  const { currentPost } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split('/')[2];
  const [channel, setChannel] = useState({});
  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return <Loading />; // Display loading message
  }

  if (!currentPost) {
    return <p>Post not found.</p>; // Display message if post is null
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
        <div className={styles.rightContent}>
          <span>Posted on {format(currentPost.createdAt)}</span>
          <h1>{currentPost.title}</h1>
          <p>{currentPost.description}</p>
          {currentUser && (
            <span className={styles.likes} onClick={handleLike}>
              <FaHeart />
              {currentPost.likes?.length}
            </span>
          )}
        </div>
      </div>
      <div className={styles.replyContent}>
        <Replies postId={currentPost._id} />
      </div>
    </div>
  );
};

export default Post;