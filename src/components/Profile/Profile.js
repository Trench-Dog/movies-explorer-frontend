import './Profile.css';
import { Link } from 'react-router-dom';

export default function Profile() {
    return (
        <main>
            <section className='profile'>
                <h1 className='profile__greeting'>Привет, Виталий!</h1>
                <div className='profile__name'>
                    <p className='profile__name-caption'>Имя</p>
                    <p className='profile__name-value'>Виталий</p>
                </div>
                <div className='profile__email'>
                    <p className='profile__email-caption'>E-mail</p>
                    <p className='profile__email-value'>pochta@yandex.ru</p>
                </div>
                <button type='button' className='profile__button profile__button_type_edit'>
                    Редактировать
                </button>
                <Link to='/' className='profile__button profile__button_type_exit'>
                        Выйти из аккаунта
                </Link>
            </section>
        </main>
    );
}
