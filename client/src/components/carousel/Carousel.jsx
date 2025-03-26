import styles from "./carousel.module.css";
import { images } from '../../lib/carouselData.js';
import { useEffect, useState } from "react";
import { LiaAngleDoubleLeftSolid } from "react-icons/lia";
import { LiaAngleDoubleRightSolid } from "react-icons/lia";


const Carousel = () => {
    const [curImg, setCurImg] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurImg(prevImg => (prevImg + 1) % images.length);
        }, 7000); // Change image every 5 seconds

        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className={styles.carousel}>
            <div className={styles.caroContent}>
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`${styles['carousel-image']} ${curImg === index ? styles.active : ''}`}
                        style={{ backgroundImage: `url(${img.image})` }}
                    />
                ))}
                <div
                    className={`${styles['carousel-control']} ${styles.left}`}
                    onClick={() => setCurImg(curImg > 0 ? curImg - 1 : images.length - 1)}
                    aria-label="Previous image"
                >
                    <LiaAngleDoubleLeftSolid size={50} color="grey" />
                </div>
                <div
                    className={`${styles['carousel-control']} ${styles.right}`}
                    onClick={() => setCurImg(curImg < images.length - 1 ? curImg + 1 : 0)}
                    aria-label="Next image"
                >
                    <LiaAngleDoubleRightSolid size={50} color="grey" />
                </div>
                <div className={styles.center}>
                    <h1>{images[curImg].title}</h1>
                    <button className={styles.button}>Learn More</button>
                </div>
            </div>
        </div>
    );
};

export default Carousel;