import express from "express"
import AuthController from '../controllers/authController';
import { redirectToDashboard } from "../middleware/middlewares";

const routeAuth = express.Router()

const authController = new AuthController

routeAuth.get("/login", redirectToDashboard, async (req, res, next) => {
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