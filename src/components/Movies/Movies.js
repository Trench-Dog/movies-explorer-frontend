import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './Movies.css';

export default function Movies(props) {
    return (
        <main>
            <section className='movies'>
                <SearchForm isSearching={props.isSearching} onSearch={props.onSearch} onCheckboxClick={props.onCheckboxClick} checkboxActive={props.checkboxActive} />
                {props.preloaderActive ? (
                    <Preloader />
                ) : (
                    <MoviesCardList notFound={props.notFound} foundMovies={props.foundMovies} onSave={props.onSave} onDelete={props.onDelete} savedMovies={props.savedMovies} />
                )}
            </section>
        </main>
    );
}
