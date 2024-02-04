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

    useEffect(() => {
        if (resolution <= 620) {
            setInitialMovieNumber(5);
        } else if (resolution < 769) {
            setInitialMovieNumber(8);
        } else if (resolution < 1001) {
            setInitialMovieNumber(12);
        } else if (resolution >= 1001) {
            setInitialMovieNumber(16);
        }
    }, [props.foundMovies, resolution]);

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
            <ul className='movies-list__container'>
                {renderedMovies.map(movie => (
                    <MoviesCard key={movie.id} movie={movie} icon={props.icon} onSave={props.onSave} onDelete={props.onDelete} savedMovies={props.savedMovies} />
                ))}
            </ul>
            {location.pathname === '/movies' ? (
                <button className='movies-list__add-button' onClick={handleAddMovies}>
                    Ещё
                </button>
            ) : (
                ''
            )}
        </section>
    );
}
