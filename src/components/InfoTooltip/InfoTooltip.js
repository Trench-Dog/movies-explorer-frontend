import successImage from '../../images/popup-success-image.svg'
import errorImage from '../../images/popup-error-image.svg';
import { useNavigate } from 'react-router-dom';
import './InfoTooltip.css'

export default function InfoTooltip(props) {
    const navigate = useNavigate();
    function closePopup() {
        props.onClose();
        if (props.isSuccess) {
            navigate('/sign-in');
        }
    }
    return (
        <div className={`status-popup ${props.isOpen ? 'status-popup_opened' : ''}`}>
            <div className="status-popup__info-container">
                <img
                    className="status-popup__image"                    
                    src={props.isSuccess ? successImage : errorImage}
                />
                <p className="status-popup__message">
                    {props.isSuccess ? props.successText : props.errorText}
                </p>
                <button
                    className="status-popup__close-button"
                    type="button"
                    onClick={closePopup}
                ></button>
            </div>
        </div>
    );
}
