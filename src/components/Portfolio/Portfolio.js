import './Portfolio.css';

export default function Portfolio() {
    return (
        <div className='portfolio'>
            <h2 className='portfolio__caption'>Портфолио</h2>
            <div className='portfolio__link'>
                <a className='portfolio__link-caption' href='https://github.com/Trench-Dog/how-to-learn'  target="_blank">Статичный сайт</a>
                <a className='portfolio__link-arrow' href='https://github.com/Trench-Dog/how-to-learn'  target="_blank"></a>
            </div>
            <div className='portfolio__link'>
                <a className='portfolio__link-caption' href='https://github.com/Trench-Dog/russian-travel'  target="_blank">Адаптивный сайт</a>
                <a className='portfolio__link-arrow' href='https://github.com/Trench-Dog/russian-travel'  target="_blank"></a>
            </div>
            <div className='portfolio__link portfolio__link_no-border'>
                <a className='portfolio__link-caption' href='https://github.com/Trench-Dog/react-mesto-api-full-gha'  target="_blank">Одностраничное приложение</a>
                <a className='portfolio__link-arrow' href='https://github.com/Trench-Dog/react-mesto-api-full-gha'  target="_blank"></a>
            </div>
        </div>
    );
}