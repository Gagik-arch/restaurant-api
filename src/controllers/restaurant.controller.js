import {ApiResponse} from '../response/index.js'
import {Restaurant} from "../models/index.js";
import {getAverageRating} from '../utils.js'
import mongoose from 'mongoose'
import {NotFoundError, ExistsError} from '../errors.js'

class RestaurantController {
    static async add(req, res, next) {
        const {name, address} = req.body

        try {
            let restaurant = await Restaurant.restaurantExists(name, address)
            if (!restaurant) {
                restaurant = new Restaurant(req.body)
                await restaurant.save()
                return res.json(req.body)
            }
            return next(res.json(new ExistsError('Resturant already exist')))

        } catch (error) {
            res.json({message: error})
        }
    }

    static async getAll(req, res, next) {
        const restaurants = await Restaurant.getAll()

        const result = restaurants.map(item => {
            let rating = getAverageRating(item.reviews)
            return {
                _id: item._id,
                name: item.name,
                address: item.address,
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
                return res.status(404).json(new NotFoundError('Restaurant not found'));
            }
            return res.status(404).json(new NotFoundError('Not valid Id'));
        } catch (e) {
            res.status(500).send('Server Error');
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
