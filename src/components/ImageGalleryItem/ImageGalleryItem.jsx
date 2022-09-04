import React from 'react';
import styles from './ImageGalleryItem.module.css';
import { nanoid } from 'nanoid';
const ImageGalleryItem = ({ imgArray, showModal }) => {
  return imgArray.map(photoCard => {
    return (
      <li
        key={nanoid()}
        className={styles.ImageGalleryItem}
        onClick={showModal}
      >
        <img
          className={styles.ImageGalleryItemImage}
          src={photoCard.webformatURL}
          alt=""
          data-source={photoCard.largeImageURL}
        />
      </li>
    );
  });
};

export default ImageGalleryItem;
