import mongoose, {Schema} from "mongoose";

const ComunitySchema = new Schema({
    content: {
        type: String,
        required: true
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true})


export const Comunity = mongoose.model("Comunity", ComunitySchema)