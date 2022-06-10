import mongoose from 'mongoose'
const { Schema, model } = mongoose
// const {ObjectId} = Schema.Types

const RestaurantSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    address:{
        type: String,
    },
}, {timestamps: true})

RestaurantSchema.statics.restaurantExists = function (name) {
    return this.findOne({ name })
}

RestaurantSchema.statics.getAll = function () {
    return this.find({})
}

export default model('Restaurant', RestaurantSchema)
