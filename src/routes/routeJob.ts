import express from "express"
import { checkAuth } from "../middleware/middlewares";

const routeJob = express()

routeJob.set('view engine', 'ejs')
routeJob.set('views', './src/views')

routeJob.get("/job", checkAuth, async (req, res, next) => {
    res.render("admin/job/index");
});

export { routeJob }