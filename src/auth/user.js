import domain from "../utils/site-domain";
const {logout} = require("./");

const user = {
    username: null,

    getAuthToken: function() {
        return localStorage.getItem('REACT_TOKEN_AUTH_KEY').split('"')[1]
    },

    setAuthToken: function(token) {
        localStorage.setItem('REACT_TOKEN_AUTH_KEY', token)
    },

    refreshToken: async function() {
        let token = this.getAuthToken()
        return new Promise(async function(resolve, reject) {
            const apiUrl = domain + '/users/refresh'
            fetch(apiUrl, {
                method: 'GET',
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json"
                },
                redirect: 'follow'
            }).then(r => {
                let resp = r.json()
                    .then(r => {
                        console.log(r)
                        if (r.access_token != null) {
                            this.setAuthToken(r)
                            resolve("REFRESHED")
                        } else {
                            logout()
                            reject("Refresh failed, user logged out")
                        }
                    })
            }).catch(function (err) {
                console.log(err)
                logout()
                reject(err)
            })
        })
    }
}

export default user;