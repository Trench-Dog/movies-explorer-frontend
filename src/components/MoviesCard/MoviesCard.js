import './MoviesCard.css';
import { useLocation } from 'react-router-dom';
import deleteMovieIcon from '../../images/delete-movie-icon.svg';
import movieLikeDisabled from '../../images/movie-like.svg';
import movieLikeEnabled from '../../images/movie-like-enabled.svg';

export default function MoviesCard(props) {
    const location = useLocation();
    const savedMovie = props.savedMovies.find(movie => movie.movieId === props.movie.id);

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
                        src={`https://api.nomoreparties.co${props.movie.image.url}`}
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
                    {location.pathname === '/saved-movies' ? (<img
                        className='movie__like'
                        src={deleteMovieIcon}
                        alt='Добавить или удалить фильм'
                        onClick={handleDelete}
                    ></img>) : (<img
                        className='movie__like'
                        src={savedMovie ? movieLikeEnabled : movieLikeDisabled}
                        alt='Добавить или удалить фильм'
                        onClick={handleSubmit}
                    ></img>
                    )}
                </button>
            </div>
            <p className='movie__duration'>{props.duration}</p>
        </li>
    );
}
