import domain from "./site-domain";
import user from "./user";

const utils = {
    capitalize: function(str) {
        let firstLetter = str.substr(0, 1);
        return firstLetter.toUpperCase() + str.substr(1);
    },
    // converts a float to a percentage with a certain number of decimal after it eg. .05 -> 5%
    makePercentage: function(flt, decimals) {
        return (Math.round(flt * 10 ** (decimals + 2)) / 10 ** decimals).toString() + "%"
    },

}

export default utils;