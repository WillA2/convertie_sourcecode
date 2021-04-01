
import React from 'react'
import SpotifyWebApi from 'spotify-web-api-node'

const spotifyApi = new SpotifyWebApi()
/*Used to communicate with Spotify's Api*/
class SpotifyGui extends React.Component{
 
    onClick = async () => {
   
        var tracksArr = await this.convert()
        var playlistId = await this.createPlaylist()
        this.addToPlaylist(playlistId, tracksArr)
       
    }

    /*Converts youtube video into a spotify track and stores 
        it as an array*/
    convert = async () => {
        var i
        var ytData = this.props.ytData
        var tracksArr = []
        for (i = 0; i < ytData.length; i++){
            
            var title = ytData[i].snippet.title.toLowerCase()
            
            /*Gets rid of anything in the video title that
                can mess up the search results in Spotify*/
            title = title.replace('(official music video)', '')
            title = title.replace('(official video)', '')
            title = title.replace('(official lyric video)', '')
            title = title.replace('(lyric video)', '')
            title = title.replace('(official live performance)', '')
            title = title.replace('(official performance)', '')
            title = title.replace('(live performance)', '')
            title = title.replace('ft.', 'feat.')
            title = title.replace('[official audio]', '')
            title = title.replace('-', '')
            title = title.replace('[lyrics]', '')
            title = title.replace('[hq]', '')
            title = title.replace('(audio)', '')
            title = title.replace('[audio]', '')
            title = title.replace('(explicit)', '')
            title = title.replace('(clean version)', '')
            title = title.replace('deleted video', '')
            title = title.replace('[cc]', '')
            title = title.replace('(lyrics)', '')
            title = title.replace('(non copyright music)', '')
            title = title.replace('(no copyright music)', '')
            title = title.replace('[non copyright music]', '')
            title = title.replace('[no copyright music]', '')

            /*Searches through Spotify and retrieve the first track it finds*/
            var res = await spotifyApi.searchTracks(title)
                .then(function(data) {
                    if (data.body.tracks.items[0] != null){
                        var trackId = data.body.tracks.items[0].id;
                        return trackId
                    }
                    }, function(err) {
                console.error(err);
                });
    
            if (res)
                tracksArr.push('spotify:track:'+res)
            
        }
        return tracksArr
    }

    /*creates a private playlist for the user*/
    createPlaylist = async () =>{
        var res = await spotifyApi.createPlaylist('youtube playlist', { 'description': 'My description', 'public': false })
        .then(function(data) {
            console.log('Created playlist!', data.body.id);
            return data.body.id
        }, function(err) {
            console.log('Something went wrong!', err);
        });
        return res
    }

    /*stores all the tracks that were converted into the newly made playlist*/
    addToPlaylist = async (playlistId, tracksArr) => {
              console.log(tracksArr)
              spotifyApi.addTracksToPlaylist(playlistId, tracksArr)
                .then(function(data) {
                console.log('Added tracks to playlist!');
                                    }, function(err) {
                                        console.log('Something went wrong!', err);
                                    });
                             
    }


render(){
    return (
        <div>
            {spotifyApi.setAccessToken(this.props.token)}
            <button onClick = {this.onClick} className  = 'button2'>
                Convert
            </button>
        </div>
        )
    }
}

export default SpotifyGui