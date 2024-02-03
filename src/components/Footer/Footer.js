import './Footer.css';

export default function Footer() {
    return (
        <footer className='footer'>
            <h3 className='footer__caption'>Учебный проект Яндекс.Практикум х BeatFilm.</h3>
            <div className='footer__container'>
                <p className='footer__year'>© 2024</p>
                <div className='footer__links'>
                    <a
                        className='footer__yandex'
                        href='https://practicum.yandex.ru'
                        target='_blank'
                    >
                        Яндекс.Практикум
                    </a>
                    <a
                        className='footer__github'
                        href='https://github.com/Trench-Dog/movies-explorer-frontend'
                        target='_blank'
                    >
                        Github
                    </a>
                </div>
            </div>
        </footer>
    );
}
