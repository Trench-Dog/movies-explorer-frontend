// import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import deleteMovieIcon from '../../images/delete-movie-icon.svg';
import './SavedMovies.css';

export default function SavedMovies() {
    return (
        <section className='saved-movies'>
            <SearchForm />
            <MoviesCardList icon={deleteMovieIcon} />
        </section>
    );
}