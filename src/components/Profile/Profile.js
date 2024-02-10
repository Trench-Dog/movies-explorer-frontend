import './Profile.css';
import { useContext, useState, useEffect } from 'react';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

export default function Profile({ isLoading, onEdit, onExit, isSuccess, successMessage }) {
    const currentUser = useContext(CurrentUserContext);
    const [editingAllowed, setEditingAllowed] = useState(false);

    const [email, setEmail] = useState({
        value: currentUser.email,
        valid: false,
        error: ''
    });
    const [name, setName] = useState({
        value: currentUser.name,
        valid: false,
        error: ''
    });

    let isValid =
        email.valid &&
        name.valid &&
        (name.value !== currentUser.name || email.value !== currentUser.email);

    const [inputsDisabled, setInputsDisabled] = useState(true);
    const [buttonDisabled, setButtonDisabled] = useState(true);

    useEffect(() => {
      if (name.value === currentUser.name) {
        name.valid = true;
      }
      if (email.value === currentUser.email) {
        email.valid = true;
      }
    }, []);

    useEffect(() => {
        if (isSuccess) {
            setEditingAllowed(false);
            setInputsDisabled(true);
        } else {
            setEditingAllowed(true);
            setInputsDisabled(false);
        }
    }, [isSuccess]);

    useEffect(() => {
        setButtonDisabled(isLoading);
    }, [isLoading]);

    useEffect(() => {
        if (isValid) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [isValid]);

    useEffect(() => {
        function onPushEsc(evt) {
            if (evt.key === 'Escape') {
                setEditingAllowed(false);
                setInputsDisabled(true);
            }
        }
        if (editingAllowed || !inputsDisabled) {
            document.addEventListener('keydown', onPushEsc);
        } else {
            document.removeEventListener('keydown', onPushEsc);
        }
    }, [editingAllowed, inputsDisabled]);

    function handleEmailChange(evt) {
        const email = evt.target;
        setEmail({
            value: email.value,
            valid: email.validity.valid,
            error: email.validationMessage
        });
    }
    function handleNameChange(evt) {
        const name = evt.target;
        setName({
            value: name.value,
            valid: name.validity.valid,
            error: name.validationMessage
        });
    }

    function handleEditing() {
        setEditingAllowed(true);
        setInputsDisabled(false);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onEdit(name.value, email.value);
        setEditingAllowed(false);
        setInputsDisabled(true);
    }

    return (
        <main>
            <form name='profile' className='profile' onSubmit={handleSubmit}>
                <h1 className='profile__greeting'>{`Привет, ${currentUser.name}!`}</h1>
                <div className='profile__name'>
                    <p className='profile__name-caption'>Имя</p>
                    <div className='profile__input-container'>
                        <input
                            className={`profile__name-value ${
                                inputsDisabled ? 'profile__input-disabled' : ''
                            }`}
                            name='name'
                            placeholder=''
                            required
                            type='text'
                            value={name.value}
                            minLength='2'
                            maxLength='30'
                            onChange={handleNameChange}
                            disabled={inputsDisabled}
                        />
                        <span className='profile__reminder'>{name.error}</span>
                    </div>
                </div>
                <div className='profile__email'>
                    <p className='profile__email-caption'>E-mail</p>
                    <div className='profile__input-container'>
                        <input
                            className={`profile__email-value ${
                                inputsDisabled ? 'profile__input-disabled' : ''
                            }`}
                            name='email'
                            placeholder=''
                            type='email'
                            value={email.value}
                            pattern='[^@]+@[^@]+\.[a-zA-Z]{2,}'
                            minLength='2'
                            maxLength='40'
                            onChange={handleEmailChange}
                            disabled={inputsDisabled}
                            required
                        />
                        <span className='profile__reminder'>{email.error}</span>
                    </div>
                </div>
                {editingAllowed ? (
                    <>
                        <p className='profile__error'>
                            {isSuccess ? '' : 'При обновлении профиля произошла ошибка.'}
                        </p>
                        <button
                            type='submit'
                            className={`profile__submit-button ${
                                buttonDisabled ? 'profile__button-disabled' : ''
                            }`}
                            disabled={buttonDisabled}
                        >
                            {isLoading ? 'Сохранение...' : 'Сохранить'}
                        </button>
                    </>
                ) : (
                    <>
                        <p className='profile__success-message'>
                            {isSuccess ? successMessage : ''}
                        </p>
                        <button
                            type='button'
                            className='profile__button profile__button_type_edit'
                            onClick={handleEditing}
                        >
                            Редактировать
                        </button>
                        <button
                            onClick={onExit}
                            type='button'
                            className='profile__button profile__button_type_exit'
                        >
                            Выйти из аккаунта
                        </button>
                    </>
                )}
            </form>
        </main>
    );
}
