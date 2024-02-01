import './Profile.css';

export default function Profile() {
    return (
        <section className='profile'>
            <h2 className='profile__greeting'>Привет, Виталий!</h2>
            <div className='profile__name'>
                <p classname='profile__name_caption'>Имя</p>
                <p className='profile__name_value'>Виталий</p>
            </div>
            <div className='profile__email'>
                <p classname='profile__email_caption'>E-mail</p>
                <p className='profile__email_value'>pochta@yandex.ru</p>
            </div>
            <button type='button' className='profile__button profile__button_type_edit'>Редактировать</button>
            <button type='button' className='profile__button profile__button_type_exit'>Выйти из аккаунта</button>
        </section>
    );
}