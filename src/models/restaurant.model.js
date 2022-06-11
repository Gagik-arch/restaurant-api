import mongoose from 'mongoose'
const { Schema, model } = mongoose

const RestaurantSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    address:{
        type: String,
        required:true
    },
    rating:{
        type: Number,
        default:0
    },
    reviews:{
        type: Number,
        default:0
    },
    telephone:{
        type: String,
        default:0,
    },
    website:{
        type:String,
        required: true
    },
    about:{
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },

}, {timestamps: true})

RestaurantSchema.statics.restaurantExists = function (name,address) {
    return this.findOne({$or: [{name}, {address}]})
}

RestaurantSchema.statics.getAll = function () {
    return this.find({})
}

export default model('Restaurant', RestaurantSchema)
