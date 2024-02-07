export const baseUrl = 'https://api.trenchdogmovie.nomoredomainsmonster.ru';

function getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
}

export function register(email, password, name) {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password,
            name: name
        })
    }).then(res => {
        return getResponseData(res);
    });
}

export function login(email, password) {
    return fetch(`${baseUrl}/signin`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email: email,
            password: password
        })
    }).then(res => {
        return getResponseData(res);
    });
}

export const checkToken = jwt => {
    return fetch(`${baseUrl}/users/me`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`
        }
    }).then(res => {
        return getResponseData(res);
    });
};
