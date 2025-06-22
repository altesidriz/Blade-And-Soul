import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import styles from './singleNew.module.css';
import { format } from 'timeago.js';
import axiosInstance from '../../../lib/axiosInstance';


const SingleNew = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); 

    const path = useLocation().pathname.split("/")[2];
    console.log(path);
    

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosInstance.get(`news/find/${path}`);
                console.log(response);
                
                if (response.status !== 200) {
                    if (response.status === 404) {
                        setError("News not found.");
                    } else {
                        setError(`Network response was not ok: ${response.status}`);
                    }
                    return;
                }

                const result = await response.data;
                console.log(result);
                
                setData(result);
            } catch (err) {
                setError(err.message); 
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [path]);

    console.log(data);
    
    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className={styles.error}>Error: {error}</div>; 
    }

    if (!data) {
        return <div className={styles.notFound}>News not found.</div>; 
    }

    return (
        <div className={styles.container}>
            <div className={styles.banner}>
                <img src={data.image} alt={data.title} />
            </div>
            <div className={styles.info}>
                <span>{format(data.createdAt)}</span>
                <h1>{data.title}</h1>
                <span>{data.category}</span>
                <p>{data.desc}</p>
            </div>
            <div className={styles.text}>
                <div className={styles.content}dangerouslySetInnerHTML={{ __html: data.content }} />
            </div>
        </div>
    );
};

export default SingleNew;