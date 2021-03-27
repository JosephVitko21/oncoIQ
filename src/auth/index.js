import {createAuthProvider} from 'react-token-auth';
import domain from "../utils/site-domain";


export const [useAuth, authFetch, login, logout] =
    createAuthProvider({
        accessTokenKey: 'access_token',
        onUpdateToken: (token) => fetch(domain + '/users/refresh', {
            method: 'POST',
            body: token.access_token
        })
        .then(r => {
            console.log("r: " + r)
            r.json()
        })
    });

function setToken(userToken) {
}

function getToken() {
}