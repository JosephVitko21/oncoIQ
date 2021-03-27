const utils = {
    capitalize: function(str) {
        let firstLetter = str.substr(0, 1);
        return firstLetter.toUpperCase() + str.substr(1);
    },
    // converts a float to a percentage with a certain number of decimal after it eg. .05 -> 5%
    makePercentage: function(flt, decimals) {
        return (Math.round(flt * 10 ** (decimals + 2)) / 10 ** decimals).toString() + "%"
    },

    // returns how long ago a UTC date, in milliseconds form, was
    timeSince: function(date) {
        date = Date.parse(date + 'UTC')
        let now = new Date()
        let seconds = Math.floor((new Date() - date) / 1000);
        let divisors = [31536000, 2592000, 86400, 3600, 60, 1]
        let description = ["years", "months", "days", "hours", "minutes", "seconds"]
        let result = [];

        let interval = seconds;

        for (let i = 0; i < divisors.length; i++) {
            interval = Math.floor(seconds / divisors[i])
            if (interval > 1) {
                result.push(interval + " " + description[i])
                //break;
            }
            seconds -= interval * divisors[i]
        }

        result.push("ago")

        return result[0] + " ago"
    },

    // returns the timestamp for the current time in UTC

}

export default utils;