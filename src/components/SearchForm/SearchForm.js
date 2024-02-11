import './SearchForm.css';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function SearchForm(props) {
    const location = useLocation();

    const [inputValue, setInputValue] = useState('');
    const [inputError, setInputError] = useState('');
    const [checkbox, setCheckbox] = useState(props.checkboxActive);

    useEffect(() => {
        if (location.pathname === '/movies') {
            setInputValue(localStorage.getItem('searchValue'));
            setCheckbox(JSON.parse(localStorage.getItem('checkboxActive')));
        } else if (location.pathname === '/saved-movies') {
            setCheckbox(false);
            props.onCheckboxClick(checkbox);
        }
    }, [location]);

    function handleInputChange(evt) {
        setInputValue(evt.target.value);
        if (evt.target.value !== 0) {
            setInputError('');
        }
    }

    function handleCheckbox() {
        setCheckbox(!checkbox);
        props.onCheckboxClick(!checkbox);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (inputValue) {
            props.onSearch(inputValue, checkbox);
        } else {
            setInputError('Введите название фильма');
        }
    }

    return (
        <div className='search'>
            <form className='search__form' name='search-movie' noValidate>
                <div className='search__container'>
                    <div className='search__icon'></div>
                    <div className='search__input-container'>
                        <input
                            className='search__input'
                            placeholder='Фильм'
                            required
                            name='movie'
                            type='text'
                            onChange={handleInputChange}
                            value={inputValue}
                        />
                        <span className='search__error'>{inputError}</span>
                    </div>
                    <button type='submit' className='search__button' onClick={handleSubmit}>
                        {props.isSearching ? 'Ищем..' : 'Найти'}
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
