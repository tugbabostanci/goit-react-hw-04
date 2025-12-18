import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';
import style from './SearchBar.module.css';

const SearchBar = ({ onSubmit }) => {
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (inputValue.trim() === '') return toast('Please enter a search query.');
    onSubmit(inputValue);
    setInputValue('');
  };

  return (
    <div className={style.container}>
      <header>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            className={style.input}
          />
          <button type="submit" className={style.Btn}>
            Search
          </button>
          <Toaster
            toastOptions={{
              className: '',
              style: {
                fontSize: '22px',
                border: '2px solid black',
                padding: '16px',
                color: 'white',
                backgroundColor: 'red',
              },
            }}
          />
        </form>
      </header>
    </div>
  );
};

export default SearchBar;