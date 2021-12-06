import domain from "./site-domain";
import user from "../auth/user";

export async function makeAuthenticatedRequest(method, path, formData) {
    return new Promise(async function(resolve, reject) {
        const apiUrl = domain + path
        fetch(apiUrl, {
            method: method,
            headers: {
                Authorization: "Bearer " + user.getAuthToken(),
            },
            body: formData,
            redirect: 'follow'
        }).then(r => {
            let resp = r.json()
                .then(data => {
                    //console.log(data)
                    //console.log("data:", data)
                    if(data.status_code === 401) {
                        // if request returns 401, get new token and try again
                        console.log("refreshing token")
                        user.refreshToken()
                            .then(_ => {
                                makeAuthenticatedRequest(method, path, formData)
                                    .then(response => {
                                        response.json()
                                            .then(data => {
                                                if(data.status_code === 200) {
                                                    // if it works this time, return data
                                                    resolve(data)
                                                } else {
                                                    console.log("Refresh token failed, going back to login page")
                                                    reject("Could not log in")
                                                }
                                            }).catch(err => reject(err))
                                    }).catch(err => reject(err))
                            }).catch(err => reject(err))
                    } else {
                        // otherwise, return data
                        resolve(data);
                    }
                }).catch(err => reject(err))
        }).catch(err => reject(err))
    })
}