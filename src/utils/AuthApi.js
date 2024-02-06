export const baseUrl = 'https://api.trenchdogmovie.nomoredomainsmonster.ru';

function getResponseData(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export function register(name, email, password) {
    return fetch(`${baseUrl}/signup`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password
        })
    }).then(res => {
        console.log(res);
        return getResponseData(res);
    });
};

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
};

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