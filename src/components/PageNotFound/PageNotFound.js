import './PageNotFound.css';

export default function PageNotFound(props) {
    function goBack() {
        props.navigate(-1);
    }

    return (
        <main>
            <section className='not-found'>
                <h1 className='not-found__error'>404</h1>
                <p className='not-found__message'>Страница не найдена</p>
                <button className='not-found__back-button' onClick={goBack}>Назад</button>
            </section>
        </main>        
    );
}