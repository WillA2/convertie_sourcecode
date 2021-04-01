import React from 'react'

/*Parses the current URL to retrieve Spotify's access token.
   Other information such as expiration time is also saved 
   for potentially later uses*/
export default function parseURL(url) {
    if (url.includes('#') === false){
        return null
    }
    url = url.substring(url.indexOf('#') + 1)
    var parsedURLArr = url.split('&')
    var i
    for (i =0; i < parsedURLArr.length; i++){
        parsedURLArr[i] = parsedURLArr[i].substring(parsedURLArr[i].indexOf('=') + 1)
    }
    return parsedURLArr[0]
}
