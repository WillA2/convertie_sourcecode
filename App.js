
import React from 'react'
import SpotifyLogin from './component/SpotifyLogin'
import Youtube from './component/Youtube'
import SpotifyGui from './component/SpotifyGui'
import parseURL from './component/parseURL'

const spotify_token = parseURL(window.location.href)
/*sets up the app*/
class App extends React.Component {
  constructor(){
    super()
    this.state = {
      ytData:[]
    }
    this.youtubeDataCallback = this.youtubeDataCallback.bind(this)
  }
  
  /*Get youtube data from Youtube component*/
  youtubeDataCallback (newData){
   this.setState({
      ytData:newData
    })
  }

 
  render(){
    return (
      <div className="header">
        <div className="description">
          <b>
            Convertie will convert your youtube playlist into a privated spotify playlist 
            <br/>
            1. Connect with your Spotify account
            <br/>
            2. Search the playlist first and preview the first video to make sure you have the right playlist
            <br/>
            3. A convert button will appear. Press on convert
            <br/>
            4. After a minute, in your spotify app you will notice a new playlist called "youtube playlist"
            <br/>
            5. Do not spam the convert button
          </b>
        </div>
         {!spotify_token ?(
          <SpotifyLogin/>
         ) : (
           <div className = 'button'>
            {window.history.pushState({},null, '/')}
          
         
              <Youtube youtubeDataCallback = {this.youtubeDataCallback} />
              {this.state.ytData.length ?(
                  <SpotifyGui token = {spotify_token} ytData = {this.state.ytData} /> 
                ) : null}
           </div>
           
         )}
      </div>
      
    );
  }

}
export default App;
