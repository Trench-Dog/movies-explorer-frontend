import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import deleteMovieIcon from '../../images/delete-movie-icon.svg';
import movieLikeDisabled from '../../images/movie-like.svg';
import movieLikeEnabled from '../../images/movie-like-enabled.svg';

export default function MoviesCard(props) {
    const location = useLocation();

    const savedMovie =
        location.pathname === '/movies' &&
        props.savedMovies.find(movie => movie.movieId === props.movie.id);

    function handleSetDuration(movie) {
        if (movie.duration < 60) {
            return `${movie.duration} мин`;
        } else if (movie.duration === 60) {
            return '1 час';
        } else if (movie.duration > 60 && movie.duration < 120) {
            return `1 час ${movie.duration - 60} мин`;
        } else if (movie.duration === 120) {
            return '2 часа';
        } else if (movie.duration > 120 && movie.duration < 180) {
            return `2 часа ${movie.duration - 120} мин`;
        } else if (movie.duration === 180) {
            return '3 часа';
        } else if (movie.duration > 180 && movie.duration < 240) {
            return `3 часа ${movie.duration - 180} мин`;
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
                        src={`https://api.nomoreparties.co${props.movie.image.url}`}
                        alt={`Кадр из фильма ${props.movie.nameRU}`}
                    />
                </a>
            )}
            <div className='movie__info'>
                <p className='movie__title'>{props.movie.nameRU}</p>
                <button type='button' className='movie__button'>
                    {location.pathname === '/saved-movies' ? (
                        <img
                            className='movie__like'
                            src={deleteMovieIcon}
                            alt='Добавить или удалить фильм'
                            onClick={handleDelete}
                        ></img>
                    ) : (
                        <img
                            className='movie__like'
                            src={savedMovie ? movieLikeEnabled : movieLikeDisabled}
                            alt='Добавить или удалить фильм'
                            onClick={handleSubmit}
                        ></img>
                    )}
                </button>
            </div>
            <p className='movie__duration'>{handleSetDuration(props.movie)}</p>
        </li>
    );
}
