import styles from './reply.module.css';
import axios from "axios";
import React, { useEffect, useState } from "react";
import { format } from 'timeago.js';

const Reply = ({ reply }) => {
  const [channel, setChannel] = useState({});

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/api/users/find/${reply.userId}`);
      setChannel(res.data)
    };
    fetchUser();
  }, [reply.userId]);

  return (
    <div className={styles.newRep}>
      <div className={styles.imgContainer}>
        <img src={channel.avatar} alt="" />
      </div>
      <div className={styles.replyText}>
        <p>{reply.description}</p>
        <span>{format(channel.createdAt)}</span>
      </div>
    </div>
  )
}

export default Reply