import { Router, json} from 'express'
import cors from 'cors'
const router = Router()
const apiRouter = Router()
import asyncHandler from 'express-async-handler'
import {RestaurantController} from "../controllers";

const addAPIHandler = (method, url, fn, ...args) => {
    method = method.toLowerCase()
    if (args) {
        return apiRouter[method](url, args, asyncHandler(fn))
    } else {
        return apiRouter[method](url, asyncHandler(fn))
    }
}
addAPIHandler('get', '/restaurants/all', RestaurantController.getAll())

apiRouter.use([cors(), json()])
router.use('/api', apiRouter)

