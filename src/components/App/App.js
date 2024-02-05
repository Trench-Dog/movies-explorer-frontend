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
import * as authApi from '../../utils/AuthApi';

export default function App() {
    const isLoggedIn = true;
    const navigate = useNavigate();

    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [preloaderActive, setPreloaderActive] = useState(false);
    const [allMovies, setAllMovies] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [foundMovies, setFoundMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [savedMoviesBackup, setSavedMoviesBackup] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    function handleRegister(name, email, password) {
        setIsLoading(true);
        authApi
            .register(name, email, password)
            .then(res => {
                if (res) {
                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleLogin(email, password) {
        setIsLoading(true);
        authApi
            .login(email, password)
            .then(res => {
                if (res.token) {
                    localStorage.setItem('jwt', res.token);
                }
            })
            .catch(err => {
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleMovieSearch(movie, checkbox) {
        setNotFound(false);
        if (allMovies.length === 0) {
            setPreloaderActive(true);
            moviesApi
                .getMovies()
                .then(movies => {
                    console.log(movies);
                    const searchedMovies = movies.filter(
                        item =>
                            item.nameRU.toLowerCase().includes(movie.toLowerCase()) ||
                            item.nameEN.toLowerCase().includes(movie.toLowerCase())
                    );
                    if (searchedMovies.length === 0) {
                        setNotFound(true);
                    } else {
                        localStorage.setItem('allMovies', JSON.stringify(movies));
                        localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies));
                        localStorage.setItem('searchValue', movie);
                        localStorage.setItem('checkboxActive', checkbox);
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
                localStorage.setItem('searchValue', movie);
                localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies));
                localStorage.setItem('checkboxActive', JSON.stringify(checkbox));
                setFoundMovies(searchedMovies);
            }
        }
    }

    function handleSavedMovieSearch(movie, checkbox) {
        setNotFound(false);
        setPreloaderActive(true);
        const searchedSavedMovies = savedMovies.filter(item =>
            item.nameRU.toLowerCase().includes(movie.toLowerCase()) ||
            item.nameEN.toLowerCase().includes(movie.toLowerCase())
        );
        if (searchedSavedMovies.length === 0) {
            setNotFound(true);
        } else {
            localStorage.setItem('checkboxActive', JSON.stringify(checkbox));
            setSavedMovies(searchedSavedMovies);
        }
    }

    function saveMovie(movie) {
        mainApi
            .saveMovie(movie)
            .then(movie => {
                setSavedMovies(savedMovies.concat(movie));
                setSavedMoviesBackup(savedMovies);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function deleteMovie(movie) {
        mainApi
            .deleteMovie(movie._id)
            .then(() => {
                setSavedMovies(
                    savedMovies.splice(savedMovies.findIndex(item => item._id === movie._id))
                );
                setSavedMoviesBackup(savedMovies);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function handlePopupOpen() {
        setIsPopupOpen(true);
    }

    function closePopup() {
        setIsPopupOpen(false);
    }

    function handleCheckbox(active) {
        let searchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));
        let shortMovies;
        if (active) {
            shortMovies = searchedMovies.filter(movie => movie.duration <= 40);
        } else {
            shortMovies = searchedMovies;
        }
        localStorage.setItem('checkboxActive', JSON.stringify(active));
        setFoundMovies(shortMovies);
    }

    function handleSavedMoviesCheckbox(active) {
        if (active) {
            let shortSavedMovies = savedMovies.filter(movie => movie.duration <= 40);
            setSavedMovies(shortSavedMovies);
        } else {
            setSavedMovies(savedMoviesBackup);
        }
        localStorage.setItem('checkboxActive', JSON.stringify(active));
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
                <Route path='/sign-up' element={<Register isLoading={isLoading} />} />
                <Route path='/sign-in' element={<Login isLoading={isLoading} />} />
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
                            <Profile isLoading={isLoading} />
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
                                onCheckboxClick={handleCheckbox}
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
                            <SavedMovies
                                preloaderActive={preloaderActive}
                                savedMovies={savedMovies}
                                onCheckboxClick={handleSavedMoviesCheckbox}
                                onSave={saveMovie}
                                onDelete={deleteMovie}
                                notFound={notFound}
                                foundMovies={savedMovies}
                                isSearching={isSearching}
                                onSearch={handleSavedMovieSearch}
                            />
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
