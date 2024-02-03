import './Navigation.css';
import { NavLink } from 'react-router-dom';

export default function Navigation(props) {
    return (
        <nav className='navigation'>
            <div className='navigation__movies'>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? 'navigation__all-movies navigation__active'
                            : 'navigation__all-movies'
                    }
                    to='/movies'
                >
                    Фильмы
                </NavLink>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? 'navigation__saved-movies navigation__active'
                            : 'navigation__saved-movies'
                    }
                    to='/saved-movies'
                >
                    Сохранённые фильмы
                </NavLink>
            </div>
            <div className='navigation__profile'>
                <NavLink
                    className={({ isActive }) =>
                        isActive
                            ? 'navigation__profile-link navigation__active'
                            : 'navigation__profile-link'
                    }
                    to='/profile'
                >
                    Аккаунт
                </NavLink>
                <div
                    className={`navigation__profile-icon navigation__profile-icon_type_${props.color}`}
                ></div>
            </div>
            <div className='navigation__popup-opener' onClick={props.openPopup}></div>
        </nav>
    );
}
