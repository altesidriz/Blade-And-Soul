import styles from './post.module.css';
import avatar from '../../assets/user/portrait.jpg';
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import axios from "axios";
import {fetchSuccess, like } from "../../redux/postSlice.js";
import { format } from "timeago.js";
import { useEffect, useState } from 'react';
import { FaHeart } from "react-icons/fa";


const Post = () => {

    const { currentUser } = useSelector((state) => state.user);
  const { currentPost } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const path = useLocation().pathname.split("/")[2];
  console.log(path);
  

  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postRes = await axios.get(`/api/posts/find/${path}`);
        const channelRes = await axios.get(
          `/api/users/find/${postRes.data.userId}`
        );
        setChannel(channelRes.data);
        dispatch(fetchSuccess(postRes.data));
      } catch (err) {

      }
    };
    fetchData();
  }, [path, dispatch]);

  const handleLike = async () => {
    await axios.put(`/api/users/like/${currentPost._id}`);
    dispatch(like(currentUser._id));
  };
        
    return (
        <div className={styles.container}>
            <div className={styles.postContent}>
                <div className={styles.leftContent}>
                    <h3>{currentUser.name}</h3>
                    <div className={styles.avatar}>
                        <img src={currentUser.image} alt="" />
                    </div>
                    <span>{currentUser.role}</span>
                </div>
                <div className={styles.rightContent}>
                    <span>Posted on {format(currentPost.createdAt)}</span>
                    <h1>{currentPost.title}</h1>
                    <p>{currentPost.description}</p>
                    <span className={styles.likes} onClick={handleLike}><FaHeart />{currentPost.likes?.length}</span>
                </div>
            </div>
        </div>
    );
};

export default Post;




// import { useEffect, useState } from 'react';
// import axios from 'axios';


//     const [user, setUser] = useState({});

//   useEffect(() => {
    //     const fetchUser = async () => {
        //       const res = await axios.get('/api/users/find/');
        //       setUser(res.data);
        //     };
        //     fetchUser();
        //   }, {});