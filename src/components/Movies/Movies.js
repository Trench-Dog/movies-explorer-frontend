import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

export default function Movies(props) {
    return (
        <main>
            <section className='movies'>
                <SearchForm isSearching={props.isSearching} onSearch={props.onSearch} onCheckboxClick={props.onCheckboxClick} />
                {props.preloaderActive ? (
                    <Preloader notFound={props.notFound} />
                ) : (
                    <MoviesCardList foundMovies={props.foundMovies} onSave={props.onSave} onDelete={props.onDelete} savedMovies={props.savedMovies} />
                )}
            </section>
        </main>
    );
}
