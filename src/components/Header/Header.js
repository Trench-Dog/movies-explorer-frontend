import NavTab from '../NavTab/NavTab';
import Navigation from '../Navigation/Navigation';
import { Link } from 'react-router-dom';
import projectLogo from '../../images/project-logo.svg';
import ('./Header.css');

export default function Header(props) {
    return (
        props.isLoggedIn ? (
            <header className={`header header_type_${props.color}`}>
            <Link to="/">
                <img className='header__logo' src={projectLogo} alt='Логотип'></img>
            </Link>
            <Navigation color={props.color} openPopup={props.openPopup} />
            </header>
        ) : (
            <header className={`header header_type_${props.color}`}>
            <img className='header__logo' src={projectLogo} alt='Логотип'></img>
            <NavTab />
            </header>
        )
    )
}