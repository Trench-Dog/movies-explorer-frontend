import './Login.css';
import { NavLink } from 'react-router-dom';
import EntranceForm from '../EntranceForm/EntranceForm';

export default function Login(props) {
    const confirmation = (
        <p className='entrance-form__confirmation'>
            Ещё не зарегистрированы?
            <NavLink className='entrance-form__link' to='/sign-up'>
                {' '}
                Регистрация
            </NavLink>
        </p>
    );

    return (
        <EntranceForm
            title='Рады видеть!'
            isSuccess={props.isSuccess}
            errorMessage={props.errorMessage}
            text={props.isLoading ? 'Выполняем вход...' : 'Войти'}
            confirmation={confirmation}
            onSubmit={props.onSubmit}
        />
    );
}
