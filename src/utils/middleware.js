import domain from "./site-domain";
import user from "../auth/user";

export async function makeAuthenticatedRequest(method, path, formData) {
    return new Promise(async function(resolve, reject) {
        const apiUrl = domain + path
        let authToken = user.getAuthToken()
        let r = await fetch(apiUrl, {
            method: method,
            headers: {
                Authorization: "Bearer " + authToken,
            },
            body: formData,
            redirect: 'follow'
        })
        let data = await r.json()

        if (r.status === 401) {
            console.log("refreshing token")
            await user.refreshToken()
            let response2 = await makeAuthenticatedRequest(method, path, formData)
            let data2 = await response2.json()
            if (response2.status === 200) {
                // if it worked this time, return data
                resolve(data2)
            } else {
                console.log("Refresh token failed, going back to login page")
                reject("Could not log in")
            }
        } else if (r.status === 200 || r.status === 202) {
            resolve(data)
        } else {
            reject(`Error: request returned status code ${r.statusCode}`)
        }
    })
}