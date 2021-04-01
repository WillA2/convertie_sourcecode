import React from 'react'
import Spotifylogo from './Spotify_Logo_CMYK_Green.png'
const {REACT_APP_KEY, REACT_APP_CLIENTID} = process.env
const uri = 'http://WillA2.github.io/convertie/'
const AUTH_URL = "https://accounts.spotify.com/authorize?client_id="
    +REACT_APP_CLIENTID+
    "&redirect_uri="
    +uri+
    "&response_type=token&scope=streaming%20user-read-email%20user-read-private%20user-library-read%20user-library-modify%20user-read-playback-state%20user-modify-playback-state%20playlist-modify-private%20playlist-modify-public"

/*Helps with authenticating the user*/
class SpotifyLogin extends React.Component {
    constructor(props){
        super(props)
        this.state={
            data:[]
        }
      }

    render(){
        return (
            <div className = 'description'>
                <a href={AUTH_URL} >
                    <img src = {Spotifylogo} className = 'logo'></img>
                </a>
            </div>
        )
    }
}

export default SpotifyLogin
