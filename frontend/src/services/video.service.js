import axios from "axios"


export class  videoService{
    async getAllVideos(){
        try {
            const getvideo = await axios.get("http://localhost:3000/api/v1/videos/videos")
        } catch (error) {
            console.log("getallvideo", error)
        }
    }
}