import './MoviesCardList.css';
import testMovieCover from '../../images/test-movie-cover.jpg';
import MoviesCard from '../MoviesCard/MoviesCard';

export default function MoviesCardList(props) {
    return (
        <section className='movies-list'>
            <ul className='movies-list__container'>
                <MoviesCard
                    duration='1ч 42м'
                    title='33 слова о дизайне'
                    cover={testMovieCover}
                    icon={props.icon}
                />
                <MoviesCard
                    duration='1ч 42м'
                    title='Киноальманах «100 лет дизайна»'
                    cover={testMovieCover}
                    icon={props.icon}
                />
                <MoviesCard
                    duration='1ч 42м'
                    title='В погоне за Бенкси'
                    cover={testMovieCover}
                    icon={props.icon}
                />
                <MoviesCard
                    duration='1ч 42м'
                    title='Баския: Взрыв реальности'
                    cover={testMovieCover}
                    icon={props.icon}
                />
                <MoviesCard
                    duration='1ч 42м'
                    title='Бег это свобода'
                    cover={testMovieCover}
                    icon={props.icon}
                />
                <MoviesCard
                    duration='1ч 42м'
                    title='Книготорговцы'
                    cover={testMovieCover}
                    icon={props.icon}
                />
                <MoviesCard
                    duration='1ч 42м'
                    title='Когда я думаю о Германии ночью'
                    cover={testMovieCover}
                    icon={props.icon}
                />
                <MoviesCard
                    duration='1ч 42м'
                    title='Gimme Danger: История Игги и The Stooges'
                    cover={testMovieCover}
                    icon={props.icon}
                />
                <MoviesCard
                    duration='1ч 42м'
                    title='33 слова о дизайне'
                    cover={testMovieCover}
                    icon={props.icon}
                />
                <MoviesCard
                    duration='1ч 42м'
                    title='Киноальманах «100 лет дизайна»'
                    cover={testMovieCover}
                    icon={props.icon}
                />
                <MoviesCard
                    duration='1ч 42м'
                    title='В погоне за Бенкси'
                    cover={testMovieCover}
                    icon={props.icon}
                />
                <MoviesCard
                    duration='1ч 42м'
                    title='Баския: Взрыв реальности'
                    cover={testMovieCover}
                    icon={props.icon}
                />
                <MoviesCard
                    duration='1ч 42м'
                    title='Бег это свобода'
                    cover={testMovieCover}
                    icon={props.icon}
                />
                <MoviesCard
                    duration='1ч 42м'
                    title='Книготорговцы'
                    cover={testMovieCover}
                    icon={props.icon}
                />
                <MoviesCard
                    duration='1ч 42м'
                    title='Когда я думаю о Германии ночью'
                    cover={testMovieCover}
                    icon={props.icon}
                />
                <MoviesCard
                    duration='1ч 42м'
                    title='Gimme Danger: История Игги и The Stooges'
                    cover={testMovieCover}
                    icon={props.icon}
                />
            </ul>
            {props.children}
        </section>
    );
}
