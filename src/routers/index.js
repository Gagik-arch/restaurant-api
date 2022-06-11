import {Router, json} from 'express'
import cors from 'cors'
import {NotFoundError, PageNotFound} from "../errors.js";
import asyncHandler from "express-async-handler";
import {RestaurantController} from "../controllers/index.js";

const router = Router()

router.get("/api/restaurants/getAll", RestaurantController.getAll)
router.post("/api/restaurants/add", RestaurantController.add)
router.get("/api/restaurants/clear", RestaurantController.clear)
router.get("/", RestaurantController.clear)

export default router
