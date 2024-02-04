import mongoose from 'mongoose'
import { dbName } from '../constant.js'

const dbConnect = async() =>{
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`)
        console.log(`\n MongoDb Connected || Db_HOST  ${connection.connection.host}`)
    } catch (error) {
        console.log('mongodb connection fail', error)
        process.exit(1)
    }
}


export default dbConnect