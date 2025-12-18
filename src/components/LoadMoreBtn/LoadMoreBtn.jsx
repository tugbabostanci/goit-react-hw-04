import styles from './LoadMoreBtn.module.css';

const LoadMoreBtn = ({ LoadMore }) => {
  return (
    <div className={styles.container}>
      <button type="button" onClick={LoadMore}>
        LOAD MORE
      </button>
    </div>
  );
};

export default LoadMoreBtn;