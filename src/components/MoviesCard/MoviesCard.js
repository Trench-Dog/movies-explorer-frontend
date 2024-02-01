import './MoviesCard.css';

export default function MoviesCard(props) {
    return (
        <li className='movie'>
            <img className='movie__cover' src={props.cover} alt={`Кадр из фильма ${props.title}`}></img>
            <div className='movie__info'>
                <p className='movie__title'>{props.title}</p>
                <button type='button' className='movie__button'>
                    <img className='movie__like' src={props.icon} alt='Добавить или удалить фильм'></img>
                </button>
            </div>
            <p className='movie__duration'>{props.duration}</p>
        </li>
    );
}