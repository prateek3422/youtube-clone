import axios from "axios"

export class YoutubeService{

    async getChannel(){
        try {
            const channel = await axios.get('http://localhost:8080/api/v1/public/youtube/channel')
            console.log(channel)
            return channel
        } catch (error) {
            console.log('channel', error)
        }
    }

    async getVideos(){
        try {
            
            const Videos = await axios.get('http://localhost:8080/api/v1/public/youtube/videos?page=1&limit=12&query=javascript&sortBy=keep%20one%3A%20mostLiked%20%7C%20mostViewed%20%7C%20latest%20%7C%20oldest')
            // console.log(Videos)
            return Videos
        } catch (error) {
            console.log('video', error)
        }

    }
}


const ytServices = new YoutubeService()
export default ytServices