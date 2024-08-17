import { useEffect, useState } from "react";
import { generatePath, useLocation } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import styles from './singleNew.module.css';
import { format } from 'timeago.js';

const SingleNew = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const path = useLocation().pathname.split("/")[2];
  console.log(path);


  useEffect(() => {
    // Define an asynchronous function to fetch data
    const fetchData = async () => {
      try {
        // Perform the GET request
        const response = await fetch(`/api/news/find/${path}`);

        // Check if the response is OK (status code 200-299)
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        // Parse the JSON data
        const result = await response.json();

        // Update the state with the fetched data
        setData(result);
      } catch (error) {
        // Update the error state if an exception occurs
        setError(error.message);
      } finally {
        // Set loading to false once the request is complete
        setLoading(false);
      }
    };

    // Call the asynchronous function
    fetchData();
  }, []);

  return (
    <div className={styles.container}>
      {loading && <Loading />}
      <div className={styles.banner}>
        <img src={data.image} alt="" />
      </div>
      <div className={styles.info}>
        <span>{format(data.createdAt)}</span>
        <h1>{data.title}</h1>
      </div>
      <div className={styles.text}>
        <p>{data.desc}</p>
      </div>
    </div>
  );
};

export default SingleNew;