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
}

export const mainApi = new MainApi({
    baseUrl: 'https://api.trenchdogmovie.nomoredomainsmonster.ru',
    headers: {
        'Content-Type': 'application/json'
    }
});