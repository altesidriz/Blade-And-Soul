import React, { useState } from 'react';
import styles from './userCarousel.module.css';


const UserCarousel = ({ pictures, onClose }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % pictures.length);
    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? pictures.length - 1 : prevIndex - 1
        );
    };

    
    

    if (!pictures || pictures.length === 0) {
        return null; // Don't render if no pictures
    }


    return (
        <div className={styles.overlay}>
      <div className={styles.carouselContainer}>
        <button className={styles.closeButton} onClick={onClose}>
          Close
        </button>
        <div className={styles.carousel}>
          <button className={styles.arrowButton} onClick={handlePrev}>
            &lt;
          </button>
          <img
            src={pictures[currentIndex]}
            alt={`User Image ${currentIndex}`}
            className={styles.carouselImage}
          />
          <button className={styles.arrowButton} onClick={handleNext}>
            &gt;
          </button>
        </div>
      </div>
    </div>
    );
}

export default UserCarousel