import React, { useState } from 'react';
import styles from './userCarousel.module.css';
import { IoMdCloseCircle } from "react-icons/io";
import { MdArrowCircleLeft } from "react-icons/md";
import { MdArrowCircleRight } from "react-icons/md";


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
          <IoMdCloseCircle size={40}/>
        </button>
        <div className={styles.carousel}>
          <button className={styles.arrowButton} onClick={handlePrev}>
          <MdArrowCircleLeft />
          </button>
          <img
            src={pictures[currentIndex]}
            alt={`User Image ${currentIndex}`}
            className={styles.carouselImage}
          />
          <button className={styles.arrowButton} onClick={handleNext}>
          <MdArrowCircleRight />
          </button>
        </div>
      </div>
    </div>
  );
}

export default UserCarousel