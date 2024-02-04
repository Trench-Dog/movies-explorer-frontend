import React from 'react';
import './Preloader.css';

export default function Preloader(props) {
    return (
        <div className="preloader">
            {props.notFound ? (
                <p className="preloader__not-found">Ничего не найдено</p>
            ) : (
                <div className="preloader__container">
                    <span className="preloader__round"></span>
                </div>)
            }
            
        </div>
    )
};
