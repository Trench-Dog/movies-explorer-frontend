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
import { useState } from 'react';

export default function App() {
    const isLoggedIn = true;
    const navigate = useNavigate();

    const [isNavigationPopupOpen, setisNavigationPopupOpen] = useState(false);
    function handlePopupOpen() {
        setisNavigationPopupOpen(true);
    }

    function closePopup() {
        setisNavigationPopupOpen(false);
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
                            <Movies />
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
                            <SavedMovies />
                            <Footer />
                        </>
                    }
                />
                <Route path='*' element={<PageNotFound navigate={navigate} />} />
            </Routes>
            <NavigationPopup isOpen={isNavigationPopupOpen} onClose={closePopup} />
        </div>
    );
}
