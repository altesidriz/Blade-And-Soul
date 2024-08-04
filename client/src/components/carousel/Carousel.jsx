import styles from "./carousel.module.css";
import { images } from '../../lib/carouselData.js';
import { useState } from "react";
import { LiaAngleDoubleLeftSolid } from "react-icons/lia";
import { LiaAngleDoubleRightSolid } from "react-icons/lia";


const Carousel = () => {
    const [curImg, setCurImg] = useState(0);

    return (
        <div className={styles.carousel}>
            <div className={styles.caroContent}
                style={{ 
                    backgroundImage: `url(${images[curImg].image})`,
                    transition: 'background-image 5s'
            }}
            >
                <div className={styles.left}
                    onClick={() => {
                        curImg > 0 && setCurImg(curImg - 1);
                    }}
                ><LiaAngleDoubleLeftSolid size={50} color="grey" /></div>
                <div className={styles.center}>
                    <h1>{images[curImg].title}</h1>
                    <span className={styles.button}>Learn More</span>
                </div>
                <div className={styles.right}
                    onClick={() => {
                        curImg < images.length-1 && setCurImg(curImg + 1);

                    }}
                ><LiaAngleDoubleRightSolid size={50} color="grey" /></div>

            </div>
        </div>
    );
};

export default Carousel;