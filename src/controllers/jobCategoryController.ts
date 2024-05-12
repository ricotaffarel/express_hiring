import express from 'express';
import db from '../utils/db';
import { jobCategoryValidation } from '../validations/jobCategoryValidation';
import { z } from 'zod';

class JobCategoryController {

    async create({ res, req }: { res: express.Response, req: express.Request }) {
        const name = req.body.name

        try {
            jobCategoryValidation.parse({
                name: name,
            })

            const create = await db.jobCategories.create({
                data: { name: name, }
            })

            if (!create) {
                return res.render('admin/job-category/create', {
                    error: "Failed to create job category, please try again"
                })
            }

            (req.session as any).message = "Successfully created job category"

            res.redirect('/admin/job-category')
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.render('admin/job-category/create', {
                    error: error.errors.map(e => e.message).join(', '),
                })
            } else {
                // Tangkap error lainnya
                res.render('admin/job-category/create', {
                    error: error,
                })
            }
        }
    }

    async update({ res, req }: { res: express.Response, req: express.Request }) {
        const name = req.body.name
        const id = req.params.id

        try {
            const conId = parseInt(id, 10)
            jobCategoryValidation.parse({
                name: name,
            })

            const update = await db.jobCategories.update({
                where: { id: conId },
                data: { name: name, }
            })

            if (!update) {
                return res.render('admin/job-category', {
                    error: "Failed to create job category, please try again"
                })
            }

            (req.session as any).message = "Successfully created job category"

            res.redirect('/admin/job-category')
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.render('admin/job-category', {
                    error: error.errors.map(e => e.message).join(', '),
                })
            } else {
                // Tangkap error lainnya
                res.render('admin/job-category', {
                    error: error,
                })
            }
        }
    }

    async get({ res, req }: { res: express.Response, req: express.Request }) {
        try {
            const msg = await (req.session as any).message
            console.log(msg)
            const data = await db.jobCategories.findMany({ orderBy: { createdAt: 'desc' } });
            (req.session as any).message = null

            res.render("admin/job-category/index", { message: msg, data: data });

        } catch (error) {
            res.render("admin/job-category/index", { error: "Failed get data category" });
        }
    }

    async delete({ res, req }: { res: express.Response, req: express.Request }) {
        try {
            const id = req.params.id
            const conId = parseInt(id, 10)

            await db.jobCategories.delete({ where: { id: conId } });

            (req.session as any).message = "Succesfully deleted data category"

            res.redirect("/admin/job-category")
        } catch (error) {
            res.render("admin/job-category/index", { error: error });
        }
    }
}

export default JobCategoryController