import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import deleteMovieIcon from '../../images/delete-movie-icon.svg';
import './SavedMovies.css';

export default function SavedMovies(props) {
    return (
        <main>
            <section className='saved-movies'>
                <SearchForm />
                {props.preloaderActive ? <Preloader /> : <MoviesCardList icon={deleteMovieIcon} />}
            </section>
        </main>
    );
}
