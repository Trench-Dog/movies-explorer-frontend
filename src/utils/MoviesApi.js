import { MOVIES_BASE_URL } from './constants';
class MoviesApi {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._headers = options.headers;
    }
    _getResponseData(res) {
        return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
    }

    getMovies() {
        return fetch(`${this._baseUrl}/beatfilm-movies`, {
            method: 'GET',
            headers: {
                ...this._headers
            }
        }).then(res => {
            return this._getResponseData(res);
        });
    }
}

export const moviesApi = new MoviesApi({
    baseUrl: MOVIES_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});
