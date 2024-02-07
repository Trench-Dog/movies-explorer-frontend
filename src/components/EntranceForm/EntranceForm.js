import './EntranceForm.css';
import { Link } from 'react-router-dom';
import projectLogo from '../../images/project-logo.svg';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function EntranceForm(props) {
    const location = useLocation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [disabled, setDisabled] = useState(true);
    function handleEmailChange(evt) {
        setEmail(evt.target.value);
    }
    function handlePasswordChange(evt) {
        setPassword(evt.target.value);
    }
    function handleSubmit(evt) {
        evt.preventDefault();
        if (location.pathname === '/sign-up') {
            props.onSubmit(email, password, props.name);
        } else if (location.pathname === '/sign-in') {
            props.onSubmit(email, password);
        }
    }

    return (
        <main>
            <section className='entrance-form'>
                <Link to='/'>
                    <img src={projectLogo} alt='Логотип' className='entrance-form__logo'></img>
                </Link>
                <h1 className='entrance-form__title'>{props.title}</h1>
                <form name='entrance' className='entrance-form__content' onSubmit={props.onSubmit}>
                    {props.children}
                    <p className='entrance-form__input-name'>E-mail</p>
                    <input
                        type='email'
                        className='entrance-form__data'
                        name='email'
                        placeholder='Введите E-mail'
                        required
                        minLength='2'
                        maxLength='40'
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <span className='entrance-form__reminder'></span>
                    <p className='entrance-form__input-name'>Пароль</p>
                    <input
                        type='password'
                        className='entrance-form__data'
                        name='password'
                        required
                        placeholder='Введите пароль'
                        minLength='7'
                        maxLength='200'
                        value={password}
                        onChange={handlePasswordChange}
                    />
                    <span className='entrance-form__reminder'></span>
                    <p className='entrance-form__error'>
                    </p>
                    <button
                        className='entrance-form__submit-button'
                        type='submit'
                        onSubmit={handleSubmit}
                        // disabled={disabled}
                    >
                        {props.text}
                    </button>
                </form>
                {props.confirmation}
            </section>
        </main>
    );
}
