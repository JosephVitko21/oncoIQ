module.exports = {
    capitalize: function(str) {
        let firstLetter = str.substr(0, 1);
        return firstLetter.toUpperCase() + str.substr(1);
    },
    makePercentage: function(flt) {
        return Math.round(flt * 100).toString() + "%"
    },
}