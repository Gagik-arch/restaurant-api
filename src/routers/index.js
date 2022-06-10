import { Router, json } from 'express'
import cors from 'cors'
import {NotFoundError, PageNotFound} from "../errors.js";
const router = Router()
const apiRouter = Router()

apiRouter.use([cors(), json()])

router.use('/api', apiRouter)
router.get('*', (_, res) => res.status(404).json(new NotFoundError()))

router.use(function (_req, _res, next) {
    next(new PageNotFound())
})

export default router
