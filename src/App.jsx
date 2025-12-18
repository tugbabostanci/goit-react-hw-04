import { useEffect, useState } from 'react';
import SearchBar from './components/SearchBar/SearchBar';
import axios from 'axios';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Loader from './components/Loader/Loader';
import ErrorMessage from './components/ErrorMessage/ErrorMessage';
import LoadMoreBtn from './components/LoadMoreBtn/LoadMoreBtn';
import ImageModal from './components/ImageModal/ImageModal';

const App = () => {
  const [images, setImages] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState(null);
  const [pages, setPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [largeImage, setLargeImage] = useState(null);

  useEffect(() => {
    const fetchImages = async () => {
      if (!query) return;

      try {
        setIsLoading(true);

        const { data } = await axios.get(
          `https://api.unsplash.com/search/photos?query=${query}&page=${pages}&per_page=9&client_id=tev_NLw0Uy9XALd3gCjdAv5c0ow5Z7hRUMb5TFdcyTg`
        );

        if (data.results.length < 9) {
          setHasMore(false);
        }

        if (pages !== 1) {
          setImages((prevState) => [...prevState, ...data.results]);
        } else {
          setImages(data.results);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchImages();
  }, [query, pages]);

  const handleSearchSubmit = (searchQuery) => {
    if (searchQuery === query) return;
    setQuery(searchQuery);
    setPages(1);
    setHasMore(true);
    setImages(null);
  };

  const LoadMore = () => {
    setPages(pages + 1);
  };

  const openModal = (imageUrl) => {
    setLargeImage(imageUrl);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setLargeImage(null);
  };

  return (
    <div>
      <SearchBar onSubmit={handleSearchSubmit} />
      {isLoading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {images && <ImageGallery images={images} onClickImage={openModal} />}
      {images && hasMore && !isLoading && <LoadMoreBtn LoadMore={LoadMore} />}
      <ImageModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        largeImage={largeImage}
      />
    </div>
  );
};

export default App;