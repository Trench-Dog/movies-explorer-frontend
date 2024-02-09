import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import './SavedMovies.css';

export default function SavedMovies(props) {
    return (
        <main>
            <section className='saved-movies'>
                <SearchForm
                    onCheckboxClick={props.onCheckboxClick}
                    isSearching={props.isSearching}
                    onSearch={props.onSearch}
                    checkboxActive={props.checkboxActive}
                />
                {props.preloaderActive ? (
                    <Preloader />
                ) : (
                    <MoviesCardList
                        notFound={props.notFound}
                        foundMovies={props.foundMovies}
                        onSave={props.onSave}
                        onDelete={props.onDelete}
                    />
                )}
            </section>
        </main>
    );
}
