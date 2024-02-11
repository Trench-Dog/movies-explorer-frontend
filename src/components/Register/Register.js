import './Register.css';
import { NavLink } from 'react-router-dom';
import EntranceForm from '../EntranceForm/EntranceForm';


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
        <EntranceForm title='Добро пожаловать!' isSuccess={props.isSuccess} errorMessage={props.errorMessage} text={props.isLoading ? 'Выполняем регистрацию...' : 'Зарегистрироваться'} confirmation={confirmation} onSubmit={props.onSubmit} isLoading={props.isLoading}>
        </EntranceForm>
    );
}