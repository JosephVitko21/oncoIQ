import {createAuthProvider} from 'react-token-auth';


export const [useAuth, authFetch, login, logout] =
    createAuthProvider({
        accessTokenKey: 'access_token',
        onUpdateToken: (token) => fetch('https://oncoiq-backend.herokuapp.com//api/refresh', {
            method: 'POST',
            body: token.access_token
        })
        .then(r => {
            console.log("r: " + r)
            r.json()
        })
    });