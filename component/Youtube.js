import React from 'react'
import Search from './Search'
import YoutubeAxios from './YoutubeAxios'

/*Queries Youtube's Api to find a specific playlist then
  stores each video of the playlist into an array*/
var vidArr = []
class Youtube extends React.Component {
    constructor(props){
        super(props)
        this.state={
            data:''
        }
      }
   searchNextPage = async (id, nextPageToken) =>{
     var promise = await YoutubeAxios.get('/playlistItems',{
       params: {
         playlistId: id,
         pageToken: nextPageToken
       }
     })

     return promise
   }
 /*Once the search bar has been filled, search the API for the playlist*/     
  onClick = async (id) => {
 
    var promise = await YoutubeAxios.get('/playlistItems',{
      params: {
        playlistId: id,
        
      }
    })
    vidArr = vidArr.concat(promise.data.items) 
    /*if the playlist has more than 50 videos*/ 
    while (promise.data.nextPageToken){
       promise = await this.searchNextPage(id, promise.data.nextPageToken)
       vidArr = vidArr.concat(promise.data.items)
     }

    
    const {youtubeDataCallback} = this.props
    youtubeDataCallback(vidArr)

    const embed = "https://www.youtube.com/embed/" + vidArr[0].snippet.resourceId.videoId 
    this.setState({
      data: embed
    })
   
  }
  render(){
    return (
        <div>
      
             <Search onSearch ={this.onClick} />
                {
      
                        <iframe title={this.state.data} width= "500" height = "300" src={this.state.data} frameBorder="0" allowFullScreen>
                       </iframe>
             
                } 
   
        </div>
        )
    }
}

export default Youtube
