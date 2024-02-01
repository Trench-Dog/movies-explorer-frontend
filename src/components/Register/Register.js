import './Register.css';
import { NavLink } from 'react-router-dom';
import EntranceForm from '../EntranceForm/EntranceForm';
import { useState } from 'react';

const confirmation = (
    <p className="entrance-form__confirmation">
        Уже зарегистрированы?
        <NavLink className="entrance-form__link" to="/sign-in">
            {' '}
            Войти
        </NavLink>
    </p>
);

export default function Register() {
    const [name, setName] = useState('');
    function handleNameChange(evt) {
        setName(evt.target.value);
    }
    return (
        <EntranceForm title='Добро пожаловать!' text='Зарегистрироваться' confirmation={confirmation}>
            <p className='entrance-form__input-name'>Имя</p>
            <input
                type="text"
                className="entrance-form__data"
                name="name"
                required
                minLength="2"
                maxLength="30"
                value={name}
                onChange={handleNameChange}
            />
            <span className="entrance-form__reminder"></span>
        </EntranceForm>
    );
}