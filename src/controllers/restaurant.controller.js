import {ActionNotAllowedError, NotFoundError, UserNotFoundError,} from '../errors.js'
import {ApiResponse} from '../response/index.js'
import {Restaurant} from "../models/index.js";

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
            let rating = 0
            item.reviews.forEach(item => rating += item.rating)
            return {
                _id: item._id,
                name: item.name,
                // address: item.address,
                // telephone: item.telephone,
                // reviews: item.reviews.length,
                rating: Math.floor(rating / item.reviews.length),
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
}

export default RestaurantController
