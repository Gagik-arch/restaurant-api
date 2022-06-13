import {ActionNotAllowedError, NotFoundError, UserNotFoundError,} from '../errors.js'
import {ApiResponse} from '../response/index.js'
import {Restaurant} from "../models/index.js";
import {getAverageRating} from '../utils.js'
import mongoose from 'mongoose'

class RestaurantController {
    static async add(req, res, next) {
        const {name, address} = req.body
        try {
            const restaurant = await Restaurant.restaurantExists(name, address)
            if (restaurant) {
                return next(res.json({message: 'Resturant exist'}))
            }
            restaurant = new Restaurant(req.body)
            await restaurant.save()
            return res.json(restaurant)
        } catch (error) {
            res.json({message: 'Error restaurant '})
        }
    }

    static async getAll(req, res, next) {
        const restaurants = await Restaurant.getAll()

        const result = restaurants.map(item => {
            let rating = getAverageRating(item.reviews)
            return {
                _id: item._id,
                name: item.name,
                rating: rating
            }
        })
        return res.json(result)
    }

    static async getRestaurant(req, res, next) {
        let {id} = req.body
        id = id.split('/').shift()
        try {
            if (mongoose.Types.ObjectId.isValid(id)) {
                const restaurant = await Restaurant.getOne(id)
                if (restaurant) {
                    return res.json(restaurant)
                }
                throw new Error()
            }
            throw new Error()
        } catch (e) {
            res.status(404).json({message: 'Error not found '})
        }
    }

    static async sendFeedback(req, res, next) {
        const {id, ...args} = req.body
        try {
            const updatedResturant = await Restaurant.updateRating(id, args)
            return res.json(updatedResturant)
        } catch (e) {
            res.status(404).send(e);
        }

    }
}

export default RestaurantController
