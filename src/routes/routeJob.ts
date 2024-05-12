import express from "express"
import { checkAuth } from "../middleware/middlewares";

const routeJob = express.Router()

routeJob.get("/admin/job", checkAuth, async (req, res, next) => {
    res.render("admin/job/index");
});

export { routeJob }