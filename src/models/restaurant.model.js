import {Schema, model} from "mongoose";
// const {ObjectId} = Schema.Types

const RestaurantSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    id: {
        type: String,
        ref: "User"
    },
}, {timestamps: true})

export default model('Restaurant', RestaurantSchema)
