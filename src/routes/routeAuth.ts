import express from "express"
import AuthController from '../controllers/authController';
import { redirectToDashboard } from "../middleware/middlewares";

const routeAuth = express()

const authController = new AuthController
routeAuth.set('view engine', 'ejs')
routeAuth.set('views', './src/views')

routeAuth.get("/login/index", redirectToDashboard, async (req, res, next) => {
    res.render("login");
},);

routeAuth.post('/login', async (req, res) => {
    authController.login({ req: req, res: res })
})

routeAuth.get('/', async (req, res) => {
    (req.session as any).token = "124"
    res.send("ok")
})

export { routeAuth }