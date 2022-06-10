import express, {Router} from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import mongoose from 'mongoose'
import config from './config.js'
import router from './src/routers/index.js'
const {limit, PORT, mongodb, corsOptions} = config

const app = express()

app.use(bodyParser.json({ limit }))
app.use(cors(corsOptions))
app.use(router)

mongoose.connect(mongodb, () => {
    app.listen(PORT, () => console.log('App listening on port: ' + PORT))
})
