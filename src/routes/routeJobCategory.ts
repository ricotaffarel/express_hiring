import express from "express"
import { checkAuth } from "../middleware/middlewares";

const routeJobCategory = express()

routeJobCategory.set('view engine', 'ejs')
routeJobCategory.set('views', './src/views')

routeJobCategory.get("/job-category", checkAuth, async (req, res, next) => {
    res.render("admin/job-category/index");
});

export { routeJobCategory }