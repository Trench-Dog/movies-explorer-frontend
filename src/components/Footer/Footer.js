import './Footer.css';

export default function Footer() {
    return (
        <footer className='footer'>
            <h3 className='footer__caption'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
            <div className='footer__container'>
                <p className='footer__container_year'>© 2024</p>
                <div className='footer__container_links'>
                    <a className='footer__container_links_yandex' href='https://practicum.yandex.ru'  target="_blank">Яндекс.Практикум</a>
                    <a className='footer__container_links_github' href='https://github.com/Trench-Dog/movies-explorer-frontend'  target="_blank">Github</a>
                </div>
            </div>
        </footer>
    );
}