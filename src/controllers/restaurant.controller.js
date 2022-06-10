import {ActionNotAllowedError, NotFoundError, UserNotFoundError,} from '../errors.js'
import {ApiResponse} from '../response/index.js'
import {Restaurant} from "../models/index.js";
import restaurantModel from "../models/restaurant.model.js";

class RestaurantController {
    static async add(req, res, next) {
        const {name, address} = req.body
        let restaurant
        try {
            restaurant = await Restaurant.restaurantExists(name)
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
        return res.json({
            count: restaurants.length,
            restaurants
        })
    }


}

export default RestaurantController
