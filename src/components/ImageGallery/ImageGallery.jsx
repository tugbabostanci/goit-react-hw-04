import ImageCard from '../ImageCard/ImageCard';
import styles from './ImageGallery.module.css';

const ImageGallery = ({ images, onClickImage }) => {
  return (
    <div className={styles.container}>
      <ul className={styles.list}>
        {Array.isArray(images) &&
          images.map((item) => (
            <li className={styles.item} key={item.id}>
              <ImageCard item={item} onClickImage={onClickImage} />
            </li>
          ))}
      </ul>
    </div>
  );
};

export default ImageGallery;