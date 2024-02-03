import './AboutProject.css';

export default function AboutProject() {
    return (
        <section className='about-project'>
            <h2 className='about-project__caption'>О проекте</h2>
            <div className='about-project__container'>
                <p className='about-project__stages'>Дипломный проект включал 5 этапов</p>
                <p className='about-project__duration'>На выполнение диплома ушло 5 недель</p>
                <p className='about-project__stage-description'>Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                <p className='about-project__deadlines'>У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            <ul className='about-project__schedule'>
                <li className="about-project__backend-duration">1 неделя</li>
                <li className="about-project__frontend-duration">4 недели</li>
                <li className="about-project__backend-caption">Back-end</li>
                <li className="about-project__frontend-caption">Front-end</li>
            </ul>
        </section>
    );
};