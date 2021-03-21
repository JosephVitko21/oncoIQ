module.exports = {
    getAuthToken: function() {
        return localStorage.getItem('REACT_TOKEN_AUTH_KEY').split('"')[1]
    },

    setAuthToken: function(token) {
        localStorage.setItem('REACT_TOKEN_AUTH_KEY', token)
    }
}