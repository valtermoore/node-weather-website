const axios = require("axios")

const forecastCode = (address, callback) => {
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${encodeURI(address)}&units=metric&appid=19478e7503eb639505cff8dc57ce4fee`;

    axios.get(url)
        .then((response) => {
            callback(undefined, `It is currently ${response.data.main.temp} degrees`);
        })
        .catch((error) => {
            callback(error.response.data.message, undefined)
        })
}

module.exports = forecastCode;