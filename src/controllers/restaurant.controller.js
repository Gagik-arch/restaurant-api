import { ActionNotAllowedError, NotFoundError, UserNotFoundError } from '../errors.js'
import { ApiResponse } from '../response'

class RestaurantController {
    static async getAll(req, res, next) {
       console.log(req,res)
    }

}

export default RestaurantController
