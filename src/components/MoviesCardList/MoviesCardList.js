import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function MoviesCardList(props) {
    const location = useLocation();
    const [resolution, setResolution] = useState(1280);
    const [renderedMovies, setRenderedMovies] = useState([]);
    const [maxMovieNumber, setMaxMovieNumber] = useState(16);

    useEffect(() => {
        renderMovies();
    }, [maxMovieNumber]);

    const allRendered = props.foundMovies.length === renderedMovies.length;

    const allMoviesPage = location.pathname === '/movies';
    const savedMoviesPage = location.pathname === '/saved-movies';

    useEffect(() => {
        if (resolution <= 620 && allMoviesPage) {
            setInitialMovieNumber(5);
        } else if (resolution < 769 && allMoviesPage) {
            setInitialMovieNumber(8);
        } else if (resolution < 1001 && allMoviesPage) {
            setInitialMovieNumber(12);
        } else if (resolution >= 1001 && allMoviesPage) {
            setInitialMovieNumber(16);
        } else if (resolution >= 320 && savedMoviesPage) {
            setInitialMovieNumber(props.foundMovies.length);
        }
    }, [props.foundMovies, resolution, allMoviesPage, savedMoviesPage]);

    useEffect(() => {
        window.onresize = () => {
            setTimeout(handleResize, 1000);
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
        if (resolution <= 620) {
            setMaxMovieNumber(maxMovieNumber + 2);
        } else if (resolution < 769) {
            setMaxMovieNumber(maxMovieNumber + 2);
        } else if (resolution < 1001) {
            setMaxMovieNumber(maxMovieNumber + 3);
        } else if (resolution >= 1001) {
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
                                icon={props.icon}
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
