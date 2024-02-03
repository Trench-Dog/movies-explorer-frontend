class MainApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }

    _getResponseData(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    }

    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                ...this._headers
            }
        }).then(res => {
            return this._getResponseData(res);
        });
    }

    editUserInfo(name, email) {
        return fetch(`${this._baseUrl}/users/me`, {
            method: 'PATCH',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                ...this._headers
            },
            body: JSON.stringify({
                name: name,
                email: email
            })
        }).then(res => {
            return this._getResponseData(res);
        });
    }

    getSavedMovies() {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'GET',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                ...this._headers
            }
        }).then(res => {
            return this._getResponseData(res);
        });
    }

    createNewMovie(movie) {
        return fetch(`${this._baseUrl}/movies`, {
            method: 'POST',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                ...this._headers
            },
            body: JSON.stringify({
                country: movie.country,
                director: movie.director,
                duration: movie.duration,
                year: movie.year,
                description: movie.description,
                image: movie.image,
                trailerLink: movie.trailerLink,
                thumbnail: movie.thumbnail,
                owner: movie.owner,
                movieId: movie.movieId,
                nameRU: movie.nameRU,
                nameEN: movie.nameEN
            })
        }).then(res => {
            return this._getResponseData(res);
        });
    }

    deleteMovie(movieId) {
        return fetch(`${this._baseUrl}/cards/${movieId}`, {
            method: 'DELETE',
            headers: {
                authorization: `Bearer ${localStorage.getItem('jwt')}`,
                ...this._headers
            }
        }).then(res => {
            return this._getResponseData(res);
        });
    }
}

export const mainApi = new MainApi({
    baseUrl: 'https://api.trenchdogmovie.nomoredomainsmonster.ru',
    headers: {
        'Content-Type': 'application/json'
    }
});
