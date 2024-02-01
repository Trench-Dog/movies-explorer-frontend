import './PageNotFound.css';

export default function PageNotFound(props) {
    function goBack() {
        props.navigate(-1);
    }

    return (
        <section className='not-found'>
            <h2 className='not-found__error'>404</h2>
            <p className='not-found__message'>Страница не найдена</p>
            <button className='not-found__back-button' onClick={goBack}>Назад</button>
        </section>
    );
}