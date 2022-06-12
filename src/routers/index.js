import {Router, json} from 'express'
import cors from 'cors'
import {NotFoundError, PageNotFound} from "../errors.js";
import {RestaurantController} from "../controllers/index.js";

const router = Router()

router.get("/api/restaurants/getAll", RestaurantController.getAll)
router.post("/api/restaurants/add", RestaurantController.add)
router.post("/api/restaurants/getOne", RestaurantController.getRestaurant)
router.post("/api/restaurants/feedback", RestaurantController.sendFeedback)
router.get('*', (_, res) => res.status(404).json({error: 'Page not found'}))

export default router
