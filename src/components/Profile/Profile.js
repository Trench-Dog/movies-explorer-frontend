import './Profile.css';
import { Link } from 'react-router-dom';

export default function Profile() {
    return (
        <main>
            <section className='profile'>
                <h1 className='profile__greeting'>Привет, Виталий!</h1>
                <div className='profile__name'>
                    <p classname='profile__name_caption'>Имя</p>
                    <p className='profile__name_value'>Виталий</p>
                </div>
                <div className='profile__email'>
                    <p classname='profile__email_caption'>E-mail</p>
                    <p className='profile__email_value'>pochta@yandex.ru</p>
                </div>
                <button type='button' className='profile__button profile__button_type_edit'>
                    Редактировать
                </button>
                <Link to='/'>
                    <button type='button' className='profile__button profile__button_type_exit'>
                        Выйти из аккаунта
                    </button>
                </Link>
            </section>
        </main>
    );
}
