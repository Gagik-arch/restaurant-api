import {ActionNotAllowedError, NotFoundError, UserNotFoundError,} from '../errors.js'
import {ApiResponse} from '../response/index.js'
import {Restaurant} from "../models/index.js";
import {getAverageRating} from '../utils.js'

class RestaurantController {
    static async add(req, res, next) {
        const {name, address} = req.body
        let restaurant
        try {
            restaurant = await Restaurant.restaurantExists(name, address)
            if (restaurant) {
                return next(res.json({message: 'Resturant exist'}))
            }
            restaurant = new Restaurant(req.body)
            await restaurant.save()
            return res.json(restaurant)
        } catch (error) {
            res.json({message: 'Error restaurant '})
            console.log('Error restaurant ')
        }
        return res.send('{name:asd}')
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
        const {id} = req.body
        const restaurant = await Restaurant.getOne(id)

        if (restaurant) {
            return res.json(restaurant)
        }
        return res.json({message: 'Resturant not exist'})
    }

    static async sendFeedback(req, res, next) {
        const {id, ...args} = req.body
        const updatedResturant = await Restaurant.updateRating(id, args)
        return res.json(updatedResturant)
    }
}

export default RestaurantController
