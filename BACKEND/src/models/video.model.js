import mongoose,{Schema} from "mongoose";
import aggregatePaginate from 'mongoose-aggregate-paginate-v2'

const videoSchema = new Schema({

    videoFile:{
        type:Object, //cloudnary url
        required:true

    },
    thumbnail:{
        type:Object, //cloudnary upload
        required:true

    },
    owner:{
        type:Schema.Types.ObjectId,
        ref: "User"
    },
    title:{
        type:String,       
        required:true

    },
    description:{
        type:String,
        required:true

    },
    duration:{
        type:Number,
        // required:true

    },
    views:{
        type:Number,
        default:0
    },
    isPublished:{
        type:Boolean,
        default:true
    }


},{
    timestamps:true,
})

videoSchema.plugin(aggregatePaginate)

export const Video = mongoose.model("Video", videoSchema)