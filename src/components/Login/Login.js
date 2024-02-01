import './Login.css';
import { NavLink } from 'react-router-dom';
import EntranceForm from '../EntranceForm/EntranceForm';

const confirmation = (
    <p className="entrance-form__confirmation">
        Ещё не зарегистрированы?
        <NavLink className="entrance-form__link" to="/sign-up">
            {' '}
            Регистрация
        </NavLink>
    </p>
);

export default function Login() {
    return (
        <EntranceForm title='Рады видеть!' text='Войти' confirmation={confirmation} />
    );
}