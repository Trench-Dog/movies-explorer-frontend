import { NavLink } from 'react-router-dom';

import('./NavTab.css');

export default function NavTab() {
    return (
        <div className='navtab'>
            <NavLink to='/sign-up' className='navtab__registration'>
                Регистрация
            </NavLink>
            <NavLink className='navtab__login' to='/sign-in'>
                Войти
            </NavLink>
        </div>
    );
}
