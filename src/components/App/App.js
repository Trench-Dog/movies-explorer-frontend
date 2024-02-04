import './App.css';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import Register from '../Register/Register';
import PageNotFound from '../PageNotFound/PageNotFound';
import Profile from '../Profile/Profile';
import Movies from '../Movies/Movies';
import SavedMovies from '../SavedMovies/SavedMovies';
import NavigationPopup from '../NavigationPopup/NavigationPopup';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';

export default function App() {
    const isLoggedIn = true;
    const navigate = useNavigate();

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [preloaderActive, setPreloaderActive] = useState(false);
    const [allMovies, setAllMovies] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [foundMovies, setFoundMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    function handleMovieSearch(movie) {
        setNotFound(false);
        if (allMovies.length === 0) {
            setPreloaderActive(true);
            moviesApi
                .getMovies()
                .then(movies => {
                    const searchedMovies = movies.filter(
                        item =>
                            item.nameRU.toLowerCase().includes(movie.toLowerCase()) ||
                            item.nameEN.toLowerCase().includes(movie.toLowerCase())
                    );
                    if (searchedMovies.length === 0) {
                        setNotFound(true);
                    } else {
                        setAllMovies(movies);
                        setFoundMovies(searchedMovies);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    setIsSearching(false);
                    setPreloaderActive(false);
                });
        } else {
            const searchedMovies = allMovies.filter(
                item =>
                    item.nameRU.toLowerCase().includes(movie.toLowerCase()) ||
                    item.nameEN.toLowerCase().includes(movie.toLowerCase())
            );
            if (searchedMovies.length === 0) {
                setNotFound(true);
            } else {
                setFoundMovies(searchedMovies);
            }
        }
    }

    function saveMovie(movie) {
        mainApi.createNewMovie(movie).then(movie => {
            setSavedMovies(savedMovies.concat(movie));
        }).catch(err => {
            console.log(err);
        });
    }

    function deleteMovie(movie) {
        mainApi.deleteMovie(movie._id).then(() => {
            setSavedMovies(savedMovies.splice(savedMovies.findIndex(item => item._id === movie._id)));
        }).catch(err => {
            console.log(err);
        });
    }

    function handlePopupOpen() {
        setIsPopupOpen(true);
    }

    function closePopup() {
        setIsPopupOpen(false);
    }

    return (
        <div className='page'>
            <Routes>
                <Route
                    path='/'
                    element={
                        <>
                            <Header
                                isLoggedIn={isLoggedIn}
                                openPopup={handlePopupOpen}
                                color='blue'
                            />
                            <Main />
                            <Footer />
                        </>
                    }
                />
                <Route path='/sign-up' element={<Register />} />
                <Route path='/sign-in' element={<Login />} />
                <Route
                    path='/profile'
                    element={
                        <>
                            <Header
                                isLoggedIn={isLoggedIn}
                                openPopup={handlePopupOpen}
                                color='black'
                                activeRoute='profile'
                            />
                            <Profile />
                        </>
                    }
                />
                <Route
                    path='/movies'
                    element={
                        <>
                            <Header
                                isLoggedIn={isLoggedIn}
                                openPopup={handlePopupOpen}
                                color='black'
                                activeRoute='movies'
                            />
                            <Movies
                                preloaderActive={preloaderActive}
                                notFound={notFound}
                                isSearching={isSearching}
                                onSearch={handleMovieSearch}
                                foundMovies={foundMovies}
                                onSave={saveMovie}
                                onDelete={deleteMovie}
                                savedMovies={savedMovies}
                            />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path='/saved-movies'
                    element={
                        <>
                            <Header
                                isLoggedIn={isLoggedIn}
                                openPopup={handlePopupOpen}
                                color='black'
                                activeRoute='saved-movies'
                            />
                            <SavedMovies preloaderActive={preloaderActive} savedMovies={savedMovies} />
                            <Footer />
                        </>
                    }
                />
                <Route path='*' element={<PageNotFound navigate={navigate} />} />
            </Routes>
            <NavigationPopup isOpen={isPopupOpen} onClose={closePopup} />
        </div>
    );
}
