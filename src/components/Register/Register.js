import './Register.css';
import { NavLink } from 'react-router-dom';
import EntranceForm from '../EntranceForm/EntranceForm';
import { useState } from 'react';


export default function Register(props) {
    const confirmation = (
        <p className="entrance-form__confirmation">
            Уже зарегистрированы?
            <NavLink className="entrance-form__link" to="/sign-in">
                {' '}
                Войти
            </NavLink>
        </p>
    );

    return (
        <EntranceForm title='Добро пожаловать!' isSuccess={props.isSuccess} errorMessage={props.errorMessage} text={props.isLoading ? 'Выполняем регистрацию...' : 'Зарегистрироваться'} confirmation={confirmation} onSubmit={props.onSubmit}>
            {/* <p className='entrance-form__input-name'>Имя</p>
            <input
                type="text"
                className="entrance-form__data"
                name="name"
                required
                placeholder='Введите имя'
                minLength="2"
                maxLength="30"
                value={name.value}
                onChange={handleNameChange}
            />
            <span className="entrance-form__reminder">{name.error}</span> */}
        </EntranceForm>
    );
}