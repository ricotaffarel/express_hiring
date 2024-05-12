import dotenv from 'dotenv'
import { routes } from "./routes/routes";
import session from 'express-session'
import express from 'express'
import path from 'path';

dotenv.config()

const app = express()

const PORT = process.env.PORT ?? 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set('view engine', 'ejs')

app.use(express.static('public'))

app.set("views", path.join(__dirname, "views"));

app.use(session({ secret: 'keyboard cat', }))

app.use(routes)

app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`)
})

