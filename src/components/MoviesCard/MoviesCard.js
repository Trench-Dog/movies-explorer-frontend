import './MoviesCard.css';
import { useLocation } from 'react-router-dom';

import {
    ONE_HOUR,
    TWO_HOURS,
    THREE_HOURS,
    FOUR_HOURS,
    MOVIES_BASE_URL
} from '../../utils/constants';

export default function MoviesCard(props) {
    const location = useLocation();

    const savedMovie =
        location.pathname === '/movies' &&
        props.savedMovies.find(movie => movie.movieId === props.movie.id);


    function handleSetDuration(movie) {
        if (movie.duration < ONE_HOUR) {
            return `${movie.duration} мин`;
        } else if (movie.duration === ONE_HOUR) {
            return '1 час';
        } else if (movie.duration > ONE_HOUR && movie.duration < TWO_HOURS) {
            return `1 час ${movie.duration - ONE_HOUR} мин`;
        } else if (movie.duration === TWO_HOURS) {
            return '2 часа';
        } else if (movie.duration > TWO_HOURS && movie.duration < THREE_HOURS) {
            return `2 часа ${movie.duration - TWO_HOURS} мин`;
        } else if (movie.duration === THREE_HOURS) {
            return '3 часа';
        } else if (movie.duration > THREE_HOURS && movie.duration < FOUR_HOURS) {
            return `3 часа ${movie.duration - THREE_HOURS} мин`;
        }
    }

    function handleSubmit() {
        if (savedMovie) {
            props.onDelete(savedMovie);
        } else {
            props.onSave(props.movie);
        }
    }

    function handleDelete() {
        props.onDelete(props.movie);
    }

    return (
        <li className='movie'>
            {location.pathname === '/saved-movies' ? (
                <a target='blank' href={props.movie.trailerLink}>
                    <img
                        className='movie__cover'
                        src={props.movie.image}
                        alt={`Кадр из фильма ${props.movie.nameRU}`}
                    />
                </a>
            ) : (
                <a target='blank' href={props.movie.trailerLink}>
                    <img
                        className='movie__cover'
                        src={`${MOVIES_BASE_URL}${props.movie.image.url}`}
                        alt={`Кадр из фильма ${props.movie.nameRU}`}
                    />
                </a>
            )}
            <div className='movie__info'>
                <p className='movie__title'>{props.movie.nameRU}</p>
                {location.pathname === '/movies' ? (
                    <button
                        type='button'
                        onClick={handleSubmit}
                        className={`movie__button ${savedMovie ? 'movie__active-button' : ''}`}
                    ></button>
                ) : (
                    <button
                        type='button'
                        className='movie__saved-button'
                        onClick={handleDelete}
                    ></button>
                )}
            </div>
            <p className='movie__duration'>{handleSetDuration(props.movie)}</p>
        </li>
    );
}
