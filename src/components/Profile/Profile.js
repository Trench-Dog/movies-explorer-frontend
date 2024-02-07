import './Profile.css';
import { useContext, useState } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Profile(props) {
    const currentUser = useContext(CurrentUserContext);
    const [editindAllowed, setEditingAllowed] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [disabled, setDisabled] = useState(true);

    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }
    function handleNameChange(evt) {
        setName(evt.target.value);
    }

    function handleEditing() {
        setEditingAllowed(true);
        setDisabled(false);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        props.onEdit(name, email);
        setEditingAllowed(false);
        setDisabled(true);
    }

    return (
        <main>
            <form name='profile' className='profile'>
                <h1 className='profile__greeting'>{`Привет, ${currentUser.name}!`}</h1>
                <div className='profile__name'>
                    <p className='profile__name-caption'>Имя</p>
                    <input
                        className={`profile__name-value ${disabled ? 'profile__disabled' : ''}`}
                        name='name'
                        placeholder=''
                        required
                        type='text'
                        value={name}
                        minLength='7'
                        maxLength='200'
                        onChange={handleNameChange}
                        disabled={disabled}
                    />
                </div>
                <div className='profile__email'>
                    <p className='profile__email-caption'>E-mail</p>
                    <input
                        className={`profile__email-value ${disabled ? 'profile__disabled' : ''}`}
                        name='email'
                        placeholder=''
                        required
                        type='email'
                        value={email}
                        minLength='2'
                        maxLength='40'
                        onChange={handleEmailChange}
                        disabled={disabled}
                    />
                </div>
                {editindAllowed ? (
                    <button
                        type='submit'
                        className='profile__submit-button'
                        onsubmit={handleSubmit}
                        disabled={disabled}
                    >
                        {props.isLoading ? 'Сохранение...' : 'Сохранить'}
                    </button>
                ) : (
                    <>
                        <button
                            type='button'
                            className='profile__button profile__button_type_edit'
                            onClick={handleEditing}
                        >
                            Редактировать
                        </button>
                        <button onClick={props.onExit()} type='button' className='profile__button profile__button_type_exit'>
                            Выйти из аккаунта
                        </button>
                    </>
                )}
            </form>
        </main>
    );
}
