import axios from 'axios'

const {REACT_APP_KEY} = process.env
export default axios.create({
    baseURL:'https://www.googleapis.com/youtube/v3/',
    params:{
        part:'snippet',
        maxResults:50,
        key: REACT_APP_KEY,
       
    },
    headers:{}
})

