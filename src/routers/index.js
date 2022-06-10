import {Router, json} from 'express'
import cors from 'cors'
import {NotFoundError, PageNotFound} from "../errors.js";
import asyncHandler from "express-async-handler";
import {RestaurantController} from "../controllers/index.js";

const router = Router()
const apiRouter = Router()

router.use('/api', apiRouter)

router.get("/api/restaurants/getAll", RestaurantController.getAll)
router.post("/api/restaurants/add", RestaurantController.add)

export default router
