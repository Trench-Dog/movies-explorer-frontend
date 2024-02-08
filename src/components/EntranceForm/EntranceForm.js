import './EntranceForm.css';
import { Link } from 'react-router-dom';
import projectLogo from '../../images/project-logo.svg';
import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function EntranceForm(props) {
    const location = useLocation();
    const [email, setEmail] = useState({
        value: '',
        valid: false,
        error: ''
    });
    const [password, setPassword] = useState({
        value: '',
        valid: false,
        error: ''
    });
    const [disabled, setDisabled] = useState(true);

    useEffect(() => {
      if (email.valid && password.valid && props.name.valid) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    }, [email.valid, password.valid, props.name.valid])

    function handleEmailChange(evt) {
        const email = evt.target;
        setEmail({
            value: email.value,
            valid: email.validity.valid,
            error: email.validationMessage
        });
    }
    function handlePasswordChange(evt) {
      const password = evt.target;
      setPassword({
          value: password.value,
          valid: password.validity.valid,
          error: password.validationMessage
      });
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if (location.pathname === '/sign-up') {
            props.onSubmit(email.value, password.value, props.name.value);
        } else if (location.pathname === '/sign-in') {
            props.onSubmit(email.value, password.value);
        }
    }

    return (
        <main>
            <section className='entrance-form'>
                <Link to='/'>
                    <img src={projectLogo} alt='Логотип' className='entrance-form__logo'></img>
                </Link>
                <h1 className='entrance-form__title'>{props.title}</h1>
                <form name='entrance' className='entrance-form__content' onSubmit={handleSubmit}>
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
                        value={email.value}
                        onChange={handleEmailChange}
                    />
                    <span className='entrance-form__reminder'>{email.error}</span>
                    <p className='entrance-form__input-name'>Пароль</p>
                    <input
                        type='password'
                        className='entrance-form__data'
                        name='password'
                        required
                        placeholder='Введите пароль'
                        minLength='7'
                        maxLength='200'
                        value={password.value}
                        onChange={handlePasswordChange}
                    />
                    <span className='entrance-form__reminder'>{password.error}</span>
                    <p className='entrance-form__error'>
                        {props.isSuccess ? '' : props.errorMessage}
                    </p>
                    <button
                        className={`entrance-form__submit-button ${disabled ? 'entrance-form__disabled' : ''}`}
                        type='submit'
                        disabled={disabled}
                    >
                        {props.text}
                    </button>
                </form>
                {props.confirmation}
            </section>
        </main>
    );
}
