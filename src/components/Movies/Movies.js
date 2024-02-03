// import Preloader from '../Preloader/Preloader';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import disabledLikeIcon from '../../images/movie-like.svg';
import './Movies.css';

export default function Movies() {
    return (
        <main>
            <section className='movies'>
                <SearchForm />
                <MoviesCardList icon={disabledLikeIcon}>
                    <button className='movies-list__add-button'>Ещё</button>
                </MoviesCardList>
            </section>
        </main>        
    );
}