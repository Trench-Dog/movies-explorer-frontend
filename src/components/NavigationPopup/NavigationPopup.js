import './NavigationPopup.css';
import { NavLink } from 'react-router-dom';

export default function NavigationPopup(props) {
    return (
        <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
            <nav className='popup__navigation'>
                <button
                    className='popup__close-button'
                    type='button'
                    onClick={props.onClose}
                ></button>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? 'popup__link popup__link_active popup__link_main-page'
                            : 'popup__link popup__link_main-page'
                    }
                    to='/'
                >
                    Главная
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? 'popup__link popup__link_active popup__link_all-movies'
                            : 'popup__link popup__link_all-movies'
                    }
                    to='/movies'
                >
                    Фильмы
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? 'popup__link popup__link_active popup__link_saved-movies'
                            : 'popup__link popup__link_saved-movies'
                    }
                    to='/saved-movies'
                >
                    Сохранённые фильмы
                </NavLink>
                <div className='popup__profile'>
                    <NavLink
                        className={({ isActive }) =>
                            isActive
                                ? 'popup__profile-link popup__link_active'
                                : 'popup__profile-link'
                        }
                        to='/profile'
                    >
                        Аккаунт
                    </NavLink>
                    <div className='popup__profile-icon'></div>
                </div>
            </nav>
        </div>
    );
}
