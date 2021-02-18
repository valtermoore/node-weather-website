const axios = require('axios');


// GeoLocation API
// Address -> Lat/Long 
const geoCode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURI(address)}.json?access_token=pk.eyJ1IjoidmFsdGVybW9vcmUiLCJhIjoiY2tsMjV6a2FxMG5kNTJ5bzRybWEzZTl6cCJ9.1uM98IepC9KsxkU3gGtjyg&limit=1`

    axios.get(url)
        .then((response) => {
            callback(undefined,{
                latitude: response.data.features[0].center[1],
                longitude: response.data.features[0].center[0],
                location: response.data.features[0].place_name
            })
        })
        .catch((error) => {
            if(error.response){

                callback(error.response.data.message, undefined)
            }else{
                callback('Unable to connect to location services !', undefined)
            }
        })
}

module.exports = geoCode;