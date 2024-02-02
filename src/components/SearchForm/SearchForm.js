import './SearchForm.css';
import { useState } from 'react';

export default function SearchForm() {
    const [movie, setMovie] = useState('');
    function handleMovieChange(evt) {
        setMovie(evt.target.value);
    }
    const [checkbox, setCheckbox] = useState(false);
    function handleCheckbox() {
        setCheckbox(!checkbox);
    }

    return (
        <div className='search'>
            <form className='search__form' name='search-movie' noValidate>
                <div className='search__container'>
                    <div className='search__icon'></div>
                    <input
                        className='search__input'
                        placeholder='Фильм'
                        required
                        name='movie'
                        type='text'
                        onChange={handleMovieChange}
                        value={movie}
                    />
                    <button type='submit' className='search__button'>
                        Найти
                    </button>
                </div>                
                <div className='search__filter'>
                    <input
                        className='search__checkbox'
                        type='checkbox'
                        onChange={handleCheckbox}
                        checked={checkbox}
                    />
                    <span className='search__checkbox-toggler'></span>
                    <p className='search__checkbox-caption'>Короткометражки</p>
                </div>
            </form>
        </div>
    );
}
