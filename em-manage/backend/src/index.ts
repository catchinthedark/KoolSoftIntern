import express, { Express } from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import cors from "cors"
import cookieParser from 'cookie-parser'
import accountRoutes from './routes/account'
import cvRoutes from './routes/cv'
import profileRoutes from './routes/profile'
import authRoutes from './routes/auth'
import { errorHandler, notFoundHandler } from "./middlewares/errorHandling"

const app: Express = express()

const PORT: string | number = process.env.PORT || 4000

app.use(cookieParser())
app.use(cors({
  origin : 'http://localhost:3000',
  credentials: true
}))
app.use(express.json());
app.use(bodyParser.urlencoded({
  extended: true
}))

app.use('/account', accountRoutes)
app.use('/cv', cvRoutes)
app.use('/profile', profileRoutes)
app.use('/auth', authRoutes)
app.use(errorHandler)
app.use(notFoundHandler)

const uri: string = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_CLUSTER}.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`

mongoose
  .connect(uri)
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on http://localhost:${PORT}`)
    )
  )
  .catch(error => {
    throw error
  })