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
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import * as authApi from '../../utils/AuthApi';

export default function App() {
    const navigate = useNavigate();

    const [isNavPopupOpen, setIsNavPopupOpen] = useState(false);
    const [isStatusPopupOpen, setIsStatusPopupOpen] = useState(false);
    const [preloaderActive, setPreloaderActive] = useState(false);
    const [allMovies, setAllMovies] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [foundMovies, setFoundMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [savedMoviesBackup, setSavedMoviesBackup] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [currentUser, setCurrentUser] = useState({
        _id: '',
        name: '',
        email: ''
      });

    useEffect(() => {
        function onPushEsc(evt) {
            if (evt.key === 'Escape') {
                closePopups();
            }
        }
        if (isNavPopupOpen || isStatusPopupOpen) {
            document.addEventListener('keydown', onPushEsc);
        } else {
            document.removeEventListener('keydown', onPushEsc);
        }
    }, [isNavPopupOpen, isStatusPopupOpen]);

    useEffect(() => {
        handleTokenCheck();
    }, []);

    function handleRegister(name, email, password) {
        setIsLoading(true);
        authApi
            .register(name, email, password)
            .then(res => {
                if (res) {
                    console.log(res);
                    setIsSuccess(true);
                    handleStatusPopupOpen();
                }
            })
            .catch(err => {                
                setIsSuccess(false);
                handleStatusPopupOpen();
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
                    setIsLoggedIn(true);
                }
            })
            .catch(err => {
                setIsSuccess(false);
                handleStatusPopupOpen();
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleTokenCheck() {
        const jwt = localStorage.getItem('jwt');
        if (jwt) {
            authApi.checkToken(jwt).then(res => {
                if (res) {
                    setIsLoggedIn(true);
                }
            });
        }
    }

    function signOut() {
        setIsLoggedIn(false);
        setAllMovies([]);
        setFoundMovies([]);
        setSavedMovies([]);
        setSavedMoviesBackup([]);
        localStorage.removeItem('jwt');
        navigate('/sign-in');
    }

    function handleMovieSearch(movie, checkbox) {
        setPreloaderActive(false);
        setNotFound(false);
        setIsSearching(true);
        if (allMovies.length === 0) {
            console.log('no allmovies');
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
                        console.log('no searched movies');
                        setNotFound(true);
                    } else {
                        localStorage.setItem('allMovies', JSON.stringify(movies));
                        localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies));
                        localStorage.setItem('searchValue', movie);
                        localStorage.setItem('checkboxActive', checkbox);
                        setAllMovies(movies);
                        setFoundMovies(searchedMovies);
                        setPreloaderActive(false);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    setIsSearching(false);
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
        setIsSearching(true);
        const searchedSavedMovies = savedMovies.filter(
            item =>
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

    function handleNavPopupOpen() {
        setIsNavPopupOpen(true);
    }

    function handleStatusPopupOpen() {
        setIsStatusPopupOpen(true);
    }

    function closePopups() {
        setIsNavPopupOpen(false);
        setIsStatusPopupOpen(false);
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
        <CurrentUserContext.Provider value={currentUser}>
        <div className='page'>
            <Routes>
                <Route
                    path='/'
                    element={
                        <>
                            <Header
                                isLoggedIn={isLoggedIn}
                                openPopup={handleNavPopupOpen}
                                color='blue'
                            />
                            <Main />
                            <Footer />
                        </>
                    }
                />
                <Route
                    path='/sign-up'
                    element={isLoggedIn ? (
                        <Navigate to="/" />
                    ) : (
                    <Register isLoading={isLoading} isSuccess={isSuccess} onSubmit={handleRegister} />
                    )}
                />
                <Route
                    path='/sign-in'
                    element={isLoggedIn ? (
                        <Navigate to="/" />
                    ) : (
                    <Login isLoading={isLoading} isSuccess={isSuccess} onSubmit={handleLogin} />
                    )}
                />
                <Route
                    path='/profile'
                    element={
                        <ProtectedRoute isLoggedIn={isLoggedIn}>
                            <Header
                                isLoggedIn={isLoggedIn}
                                openPopup={handleNavPopupOpen}
                                color='black'
                                activeRoute='profile'
                            />
                            <Profile isLoading={isLoading} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/movies'
                    element={
                        <ProtectedRoute isLoggedIn={isLoggedIn}>
                            <Header
                                isLoggedIn={isLoggedIn}
                                openPopup={handleNavPopupOpen}
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
                        </ProtectedRoute>
                    }
                />
                <Route
                    path='/saved-movies'
                    element={
                        <ProtectedRoute isLoggedIn={isLoggedIn}>
                            <Header
                                isLoggedIn={isLoggedIn}
                                openPopup={handleNavPopupOpen}
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
                        </ProtectedRoute>
                    }
                />
                <Route path='*' element={<PageNotFound navigate={navigate} />} />
            </Routes>
            <NavigationPopup isOpen={isNavPopupOpen} onClose={closePopups} />
            <InfoTooltip
                isSuccess={isSuccess} 
                errorText={'Что-то пошло не так! Попробуйте ещё раз.'}
                successText={'Вы успешно зарегистрировались!'}
                onClose={closePopups}
                isOpen={isStatusPopupOpen}
            />
        </div>
        </CurrentUserContext.Provider>
    );
}
