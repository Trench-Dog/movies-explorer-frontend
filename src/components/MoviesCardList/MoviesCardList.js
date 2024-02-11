import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

import {
    TIMEOUT,
    RESOLUTION_320,
    RESOLUTION_620,
    RESOLUTION_769,
    RESOLUTION_1001,
    RESOLUTION_1280,
    MOVIE_NUMBER_320,
    MOVIE_NUMBER_768,
    MOVIE_NUMBER_1000,
    MOVIE_NUMBER_1280
} from '../../utils/constants';

export default function MoviesCardList(props) {
    const location = useLocation();
    const [resolution, setResolution] = useState(RESOLUTION_1280);
    const [renderedMovies, setRenderedMovies] = useState([]);
    const [maxMovieNumber, setMaxMovieNumber] = useState(16);

    useEffect(() => {
        renderMovies();
    }, [maxMovieNumber]);

    const allRendered = props.foundMovies.length === renderedMovies.length;

    const allMoviesPage = location.pathname === '/movies';
    const savedMoviesPage = location.pathname === '/saved-movies';

    useEffect(() => {
        if (resolution <= RESOLUTION_620 && allMoviesPage) {
            setInitialMovieNumber(MOVIE_NUMBER_320);
        } else if (resolution < RESOLUTION_769 && allMoviesPage) {
            setInitialMovieNumber(MOVIE_NUMBER_768);
        } else if (resolution < RESOLUTION_1001 && allMoviesPage) {
            setInitialMovieNumber(MOVIE_NUMBER_1000);
        } else if (resolution >= RESOLUTION_1001 && allMoviesPage) {
            setInitialMovieNumber(MOVIE_NUMBER_1280);
        } else if (resolution >= RESOLUTION_320 && savedMoviesPage) {
            setInitialMovieNumber(props.foundMovies.length);
        }
    }, [props.foundMovies, resolution, allMoviesPage, savedMoviesPage]);

    useEffect(() => {
        window.onresize = () => {
            setTimeout(handleResize, TIMEOUT);
        };
    }, []);

    function renderMovies() {
        let movies = [];
        props.foundMovies.forEach((item, i) => {
            if (i < maxMovieNumber) {
                movies.push(item);
            }
        });
        setRenderedMovies(movies);
    }

    function setInitialMovieNumber(number) {
        setMaxMovieNumber(number);
        let movies = [];
        props.foundMovies.forEach((item, i) => {
            if (i < number) {
                movies.push(item);
            }
        });
        setRenderedMovies(movies);
    }

    function handleResize() {
        setResolution(window.innerWidth);
    }

    function handleAddMovies() {
        if (resolution <= RESOLUTION_620) {
            setMaxMovieNumber(maxMovieNumber + 2);
        } else if (resolution < RESOLUTION_769) {
            setMaxMovieNumber(maxMovieNumber + 2);
        } else if (resolution < RESOLUTION_1001) {
            setMaxMovieNumber(maxMovieNumber + 3);
        } else if (resolution >= RESOLUTION_1001) {
            setMaxMovieNumber(maxMovieNumber + 4);
        }
    }

    return (
        <section className='movies-list'>
            {props.notFound ? (
                <p className='movies-list__not-found'>Ничего не найдено</p>
            ) : (
                <>
                    <ul className='movies-list__container'>
                        {renderedMovies.map(movie => (
                            <MoviesCard
                                key={movie.id || movie._id}
                                movie={movie}
                                onSave={props.onSave}
                                onDelete={props.onDelete}
                                savedMovies={props.savedMovies}
                            />
                        ))}
                    </ul>
                    {location.pathname === '/movies' && !allRendered ? (
                        <button className='movies-list__add-button' onClick={handleAddMovies}>
                            Ещё
                        </button>
                    ) : (
                        ''
                    )}
                </>
            )}
        </section>
    );
}
