import mongoose from 'mongoose'
import {getAverageRating} from '../utils.js'

const {Schema, model} = mongoose
const {ObjectId} = Schema.Types

const RestaurantSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true
    },
    image: {
        type: String,
        trim: true,
    },
    address: {
        type: String,
        required: true
    },
    telephone: {
        type: String,
        default: 0,
    },
    rating: {
        type: Number,
        required: false,
        default: 0
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
                required: false
            },
            feedback: {
                type: String,
                required: false
            },
            userId: {
                type: String,
                required: false
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
    return this.findById(id).then((restaurant, err) => {
            restaurant.rating = getAverageRating(restaurant.reviews)
            return restaurant
        }
    )
}

RestaurantSchema.statics.updateRating = function (id, args) {
    return this.findById(id).then(res => {
        res.reviews.push(args)
        res.rating = getAverageRating(res.reviews)
        res.save();
        return res
    })
}

export default model('Restaurant', RestaurantSchema)
