import { API } from './config'

export const listFiles = (userId, token) => {
    return fetch(`${API}/file/list/${userId}`, {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json()
        })
        .catch(err => console.log(err))
}

export const upload = (userId, token, file) => {
    return fetch(`${API}/file/create/${userId}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: file
    })
        .then(response => {
            return response.json();
        })
        .catch(err => {
            console.log(err);
        });
}