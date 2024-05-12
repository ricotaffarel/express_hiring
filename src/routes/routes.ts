import express from "express";
import { routeAuth } from "./routeAuth";
import { checkAuth } from "../middleware/middlewares";
import { routeJobCategory } from "./routeJobCategory";
import { routeJob } from "./routeJob";

const routes = express.Router()

routes.use(routeAuth)
routes.use(routeJobCategory)
routes.use(routeJob)

routes.get("/admin", checkAuth, async (req, res) => {
    res.render("admin/index")
})

export { routes }
