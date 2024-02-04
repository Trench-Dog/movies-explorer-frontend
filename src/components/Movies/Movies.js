import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import disabledLikeIcon from '../../images/movie-like.svg';
import enabledLikeIcon from '../../images/movie-like-enabled.svg';
import './Movies.css';

export default function Movies(props) {
    return (
        <main>
            <section className='movies'>
                <SearchForm isSearching={props.isSearching} onSearch={props.onSearch} />
                {props.preloaderActive ? (
                    <Preloader notFound={props.notFound} />
                ) : (
                    <MoviesCardList icon={disabledLikeIcon} foundMovies={props.foundMovies} onSave={props.onSave} onDelete={props.onDelete} savedMovies={props.savedMovies} />
                )}
            </section>
        </main>
    );
}
