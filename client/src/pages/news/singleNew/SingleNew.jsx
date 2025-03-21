import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Loading from "../../../components/loading/Loading";
import styles from './singleNew.module.css';
import { format } from 'timeago.js';

const SingleNew = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null); // Add error state

    const path = useLocation().pathname.split("/")[2];

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`/api/news/find/${path}`);

                if (!response.ok) {
                    // Handle non-200 status codes
                    if (response.status === 404) {
                        setError("News not found.");
                    } else {
                        setError(`Network response was not ok: ${response.status}`);
                    }
                    return; // Exit the function to prevent further processing
                }

                const result = await response.json();
                setData(result);
            } catch (err) {
                setError(err.message); // Capture error message
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [path]);

    if (loading) {
        return <Loading />;
    }

    if (error) {
        return <div className={styles.error}>Error: {error}</div>; // Display error message
    }

    if (!data) {
        return <div className={styles.notFound}>News not found.</div>; // Handle case where data is null after loading
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