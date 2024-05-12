import express from "express"
import { checkAuth } from "../middleware/middlewares";
import JobCategoryController from '../controllers/jobCategoryController';

const routeJobCategory = express.Router()
const jobCategoryController = new JobCategoryController

routeJobCategory.get('/admin/job-category', checkAuth, async (req, res, next) => {
    jobCategoryController.get({ req: req, res: res })
});

routeJobCategory.get('/admin/job-category/create', checkAuth, async (req, res, next) => {
    res.render("admin/job-category/create");
});

routeJobCategory.post('/admin/job-category/create', checkAuth, async (req, res, next) => {
    jobCategoryController.create({ req: req, res: res, })
});

routeJobCategory.post('/admin/job-category/:id', checkAuth, async (req, res, next) => {
    jobCategoryController.delete({ req: req, res: res, })
});

routeJobCategory.post('/admin/job-category/edit/:id', checkAuth, async (req, res, next) => {
    jobCategoryController.update({ req: req, res: res, })
});

export { routeJobCategory }