import './Navigation.css';
import { NavLink } from 'react-router-dom';


export default function Navigation(props) {

    return (
        <nav className='navigation' activeClassName='active'>
            <div className='navigation__movies'>
                <NavLink className='navigation__all-movies' to='/movies'>Фильмы</NavLink>
                <NavLink className='navigation__saved-movies' to='/saved-movies'>Сохранённые фильмы</NavLink>
            </div>
            <div className='navigation__profile'>
                <NavLink className='navigation__profile-link' to='/profile'>Аккаунт</NavLink>
                <div className={`navigation__profile-icon navigation__profile-icon_type_${props.color}`}></div>
            </div>
            <div className='navigation__popup-opener' onClick={props.openPopup}></div>
        </nav>
    );
}