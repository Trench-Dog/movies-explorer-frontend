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
    
    const [name, setName] = useState('');
    
    function handleNameChange(evt) {
        setName(evt.target.value);
    }
    return (
        <EntranceForm title='Добро пожаловать!' text={props.isLoading ? 'Выполняем регистрацию...' : 'Зарегистрироваться'} confirmation={confirmation} onSubmit={props.onSubmit} name={name}>
            <p className='entrance-form__input-name'>Имя</p>
            <input
                type="text"
                className="entrance-form__data"
                name="name"
                required
                placeholder='Введите имя'
                minLength="2"
                maxLength="30"
                value={name}
                onChange={handleNameChange}
            />
            <span className="entrance-form__reminder"></span>
        </EntranceForm>
    );
}