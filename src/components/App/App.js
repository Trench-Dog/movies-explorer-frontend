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
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { Routes, Route, useNavigate, Navigate, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import * as authApi from '../../utils/AuthApi';

import { SHORT_MOVIE } from '../../utils/constants';

export default function App() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isNavPopupOpen, setIsNavPopupOpen] = useState(false);
    const [preloaderActive, setPreloaderActive] = useState(false);
    const [allMovies, setAllMovies] = useState([]);
    const [notFound, setNotFound] = useState(false);
    const [foundMovies, setFoundMovies] = useState([]);
    const [savedMovies, setSavedMovies] = useState([]);
    const [saveBackup, setSaveBackup] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [checkBoxActive, setCheckboxActive] = useState(false);
    const [savedCheckBoxActive, setSavedCheckboxActive] = useState(false);
    const savedCurrentUser = localStorage.getItem('currentUser');
    const initialCurrentUser = savedCurrentUser
        ? JSON.parse(savedCurrentUser)
        : { _id: '', name: '', email: '' };
    const [currentUser, setCurrentUser] = useState(initialCurrentUser);
    const token = localStorage.getItem('jwt');
    const loggedIn = Boolean(token);
    const [isLoggedIn, setIsLoggedIn] = useState(loggedIn);

    useEffect(() => {
        handleTokenCheck();
    }, []);

    useEffect(() => {
        console.log(savedMovies);
    }, [savedMovies]);

    useEffect(() => {
        function onPushEsc(evt) {
            if (evt.key === 'Escape') {
                closePopups();
            }
        }
        if (isNavPopupOpen) {
            document.addEventListener('keydown', onPushEsc);
        } else {
            document.removeEventListener('keydown', onPushEsc);
        }
    }, [isNavPopupOpen]);

    useEffect(() => {
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    }, [currentUser]);

    useEffect(() => {
        if (isLoggedIn) {
            mainApi.getSavedMovies().then(movies => {
                localStorage.setItem('savedMovies', JSON.stringify(movies));
                setSavedMovies(movies);
                setSaveBackup(movies);
            });
            mainApi
                .getUserInfo()
                .then(userData => {
                    setCurrentUser(userData);
                })
                .catch(err => alert(err));
        }
        if (JSON.parse(localStorage.getItem('allMovies'))) {
            setAllMovies(JSON.parse(localStorage.getItem('allMovies')));
        }
        if (JSON.parse(localStorage.getItem('searchedMovies'))) {
            let activeCheckbox = JSON.parse(localStorage.getItem('checkboxActive'));
            let searchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));
            setCheckboxActive(activeCheckbox);
            if (activeCheckbox) {
                handleCheckbox(activeCheckbox);
            } else {
                setFoundMovies(searchedMovies);
            }
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (
            location.pathname !== '/sign-in' &&
            errorMessage === 'Возникла ошибка при авторизации'
        ) {
            setErrorMessage('');
        } else if (
            location.pathname !== '/sign-up' &&
            errorMessage === 'Возникла ошибка при регистрации'
        ) {
            setErrorMessage('');
        } else if (
            location.pathname !== '/profile' &&
            successMessage === 'Вы успешно обновили профиль!'
        ) {
            setSuccessMessage('');
        }
        if (location.pathname === '/movies' && savedMovies !== saveBackup) {
            setSavedMovies(saveBackup);
        }
    }, [location]);

    function handleRegister(email, password, name) {
        setIsLoading(true);
        authApi
            .register(email, password, name)
            .then(res => {
                if (res) {
                    setIsSuccess(true);
                    handleLogin(email, password);
                }
            })
            .catch(err => {
                setErrorMessage('Возникла ошибка при регистрации');
                setIsSuccess(false);
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
                    navigate('/movies');
                }
            })
            .catch(err => {
                setErrorMessage('Возникла ошибка при авторизации');
                setIsSuccess(false);
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }

    function handleEditProfile(name, email) {
        setIsLoading(true);
        mainApi
            .editUserInfo(name, email)
            .then(user => {
                if (user) {
                    setCurrentUser(user);
                    setIsSuccess(true);
                    setSuccessMessage('Вы успешно обновили профиль!');
                } else {
                    setIsSuccess(false);
                }
            })
            .catch(err => {
                if (err) {
                    setIsSuccess(false);
                }
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
        setSavedCheckboxActive(false);
        setCheckboxActive(false);
        setIsLoggedIn(false);
        setIsLoading(false);
        setIsSuccess(true);
        setNotFound(false);
        setPreloaderActive(false);
        setAllMovies([]);
        setFoundMovies([]);
        setSavedMovies([]);
        setSaveBackup([]);
        localStorage.clear();
        navigate('/');
    }

    function handleMovieSearch(movie, checkbox) {
        setNotFound(false);
        setIsSearching(true);
        setPreloaderActive(true);
        if (allMovies.length === 0) {
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
                        setPreloaderActive(false);
                    } else {
                        setCheckboxActive(false);
                        localStorage.setItem('allMovies', JSON.stringify(movies));
                        setAllMovies(movies);
                        localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies));
                        localStorage.setItem('searchValue', movie);
                        if (checkbox) {
                            handleCheckbox(checkbox);
                        } else {
                            setFoundMovies(searchedMovies);
                        }
                        localStorage.setItem('checkboxActive', JSON.stringify(checkbox));
                        setPreloaderActive(false);
                    }
                })
                .catch(err => {
                    console.log(err);
                })
                .finally(() => {
                    setIsSearching(false);
                });
        } else if (allMovies.length !== 0) {
            const searchedMovies = allMovies.filter(
                item =>
                    item.nameRU.toLowerCase().includes(movie.toLowerCase()) ||
                    item.nameEN.toLowerCase().includes(movie.toLowerCase())
            );
            if (searchedMovies.length === 0) {
                setNotFound(true);
                setIsSearching(false);
                setPreloaderActive(false);
            } else {
                localStorage.setItem('searchValue', movie);
                localStorage.setItem('searchedMovies', JSON.stringify(searchedMovies));
                if (checkbox) {
                    handleCheckbox(checkbox);
                } else {
                    setFoundMovies(searchedMovies);
                }
                localStorage.setItem('checkboxActive', JSON.stringify(checkbox));
                setIsSearching(false);
                setPreloaderActive(false);
                setCheckboxActive(false);
            }
        }
    }

    function handleSavedMovieSearch(movie, checkbox) {
        setNotFound(false);
        setPreloaderActive(true);
        setIsSearching(true);
        const searchedSavedMovies = JSON.parse(localStorage.getItem('savedMovies')).filter(
            item =>
                item.nameRU.toLowerCase().includes(movie.toLowerCase()) ||
                item.nameEN.toLowerCase().includes(movie.toLowerCase())
        );
        if (searchedSavedMovies.length === 0) {
            setSavedMovies(JSON.parse(localStorage.getItem('savedMovies')));
            setNotFound(true);
            setIsSearching(false);
            setPreloaderActive(false);
        } else {
            setSavedCheckboxActive(false);
            localStorage.setItem('savedCheckboxActive', JSON.stringify(checkbox));
            setSavedMovies(searchedSavedMovies);
            setIsSearching(false);
            setPreloaderActive(false);
        }
    }

    function handleCheckbox(status) {
        let shortMovies;
        let searchedMovies = JSON.parse(localStorage.getItem('searchedMovies'));
        if (status) {
            shortMovies = searchedMovies.filter(movie => movie.duration <= SHORT_MOVIE);
        } else {
            shortMovies = searchedMovies;
        }
        setFoundMovies(shortMovies);
        localStorage.setItem('checkboxActive', JSON.stringify(status));
    }

    function handleSavedMoviesCheckbox(status) {
        let shortSavedMovies;
        if (status) {
            shortSavedMovies = savedMovies.filter(movie => movie.duration <= SHORT_MOVIE);
        } else if (!status) {
            shortSavedMovies = saveBackup;
        }
        setSavedMovies(shortSavedMovies);
        localStorage.setItem('savedCheckboxActive', JSON.stringify(status));
    }

    function saveMovie(movie) {
        mainApi
            .saveMovie(movie)
            .then(movie => {
                setSavedMovies(savedMovies.concat(movie));
                setSaveBackup(savedMovies.concat(movie));
                localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
            })
            .catch(err => {
                console.log(err);
            });
    }

    function deleteMovie(movie) {
        mainApi
            .deleteMovie(movie._id)
            .then(() => {
                setSavedMovies(savedMovies.filter(item => item._id !== movie._id));
                setSaveBackup(saveBackup.filter(item => item._id !== movie._id));
                localStorage.setItem('savedMovies', JSON.stringify(savedMovies));
            })
            .catch(err => {
                console.log(err);
            });
    }

    function handleNavPopupOpen() {
        setIsNavPopupOpen(true);
    }

    function closePopups() {
        setIsNavPopupOpen(false);
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
                        element={
                            isLoggedIn ? (
                                <Navigate to='/movies' />
                            ) : (
                                <Register
                                    isLoading={isLoading}
                                    isSuccess={isSuccess}
                                    onSubmit={handleRegister}
                                    errorMessage={errorMessage}
                                />
                            )
                        }
                    />
                    <Route
                        path='/sign-in'
                        element={
                            isLoggedIn ? (
                                <Navigate to='/movies' />
                            ) : (
                                <Login
                                    isLoading={isLoading}
                                    isSuccess={isSuccess}
                                    onSubmit={handleLogin}
                                    errorMessage={errorMessage}
                                />
                            )
                        }
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
                                <Profile
                                    isLoading={isLoading}
                                    onEdit={handleEditProfile}
                                    onExit={signOut}
                                    isSuccess={isSuccess}
                                    successMessage={successMessage}
                                />
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
                                    checkBoxActive={checkBoxActive}
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
                                    checkBoxActive={savedCheckBoxActive}
                                    onSearch={handleSavedMovieSearch}
                                />
                                <Footer />
                            </ProtectedRoute>
                        }
                    />
                    <Route
                        path='*'
                        element={<PageNotFound navigate={navigate} isLoggedIn={isLoggedIn} />}
                    />
                </Routes>
                <NavigationPopup isOpen={isNavPopupOpen} onClose={closePopups} />
            </div>
        </CurrentUserContext.Provider>
    );
}
