const ImageCard = ({ item, onClickImage }) => {
  return (
    <img
      src={item.urls.small}
      alt={item.alt_description}
      width={300}
      height={175}
      onClick={() => onClickImage(item.urls.regular)}
    />
  );
};

export default ImageCard;