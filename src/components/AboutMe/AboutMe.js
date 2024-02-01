import './AboutMe.css';
import photo from '../../images/photo.jpg';
import Portfolio from '../Portfolio/Portfolio';

export default function AboutMe() {
    return (
        <section className='about-me'>
            <h2 className='about-me__caption'>Студент</h2>
            <div className='about-me__container'>
                <div className='about-me__info'>
                    <p className='about-me__name'>Александр</p>
                    <p className='about-me__occupation'>Фронтенд-разработчик, 32 года</p>
                    <p className='about-me__description'>В детстве был благовоспитанным мальчиком, но начал играть в орлянку, связался с Яндекс.Практикум и покатился...Характер странный. Женат.</p>
                    <a href='https://github.com/Trench-Dog' className='about-me__link'  target="_blank">Github</a>
                </div>
                <img className='about-me__photo' src={photo} alt='Фото студента'></img>
            </div>
            <Portfolio />
        </section>
    );
}