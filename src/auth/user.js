import domain from "../utils/site-domain";
import {makeAuthenticatedRequest} from "../utils/middleware";
import {useNavigate} from "react-router-dom";
const {logout} = require("./");

const user = {
    username: null,
    profilePic: null,
    name: null,
    position: null,

    getAuthToken: function() {
        try {
            return localStorage.getItem('REACT_TOKEN_AUTH_KEY').split('"')[1]
        } catch (e) {
            return null
        }

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
    },

    getUsername: async function() {
        console.log('getting username')
        let data = await makeAuthenticatedRequest('GET', `/users/data`)
        if (!data) {
            await logout()
            return null
            // calling should handle by navigating to homepage
        } else {
            user.username = data.username
            user.name = data.name
            user.position = data.position
            user.profilePic = data.profilePic
            return user.username
        }
    }
}

export default user;