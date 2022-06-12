import mongoose from 'mongoose'

const {Schema, model} = mongoose
const {ObjectId} = Schema.Types

const RestaurantSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        default: 0,
    },
    website: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    reviews: [
        {
            rating: {
                type: Number,
                required: true
            },
            feedback: {
                type: String,
                required: true
            },
            userId: {
                type: String,
                required: true
            },
        }
    ],
}, {timestamps: true})

RestaurantSchema.statics.restaurantExists = function (name, address) {
    return this.findOne({$or: [{name}, {address}]})
}
RestaurantSchema.statics.getAll = function () {
    return this.find({})
}
RestaurantSchema.statics.getOne = function (id) {
    return this.findById(id).then(res => res)
}

export default model('Restaurant', RestaurantSchema)
