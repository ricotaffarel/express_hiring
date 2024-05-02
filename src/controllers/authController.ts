import db from "../utils/db";
import { loginValidation } from "../validations/authValidation"
import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { z } from "zod"

class AuthController {
    async login({ res, req }: {
        res: express.Response, req: express.Request
    }) {
        const username = req.body.username
        const password = req.body.password

        try {
            loginValidation.parse({
                username: username,
                password: password
            })

            const user = await db.user.findFirst({
                where: { username: username }
            });

            if (!user) {
                return res.render('login', {
                    errors: "Invalid username or password"
                })

            } else {
                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    return res.render('login', {
                        errors: "Invalid username or password"
                    })
                }

                const token = jwt.sign({ user }, 'secretKey',);

                (req.session as any).token = token

                res.redirect('/admin')
            }
        } catch (error) {
            if (error instanceof z.ZodError) {
                res.render('login', {
                    errors: error.errors.map(e => e.message).join(', '),
                })
            } else {
                // Tangkap error lainnya
                res.render('login', {
                    errors: error,
                })
            }

        }
    }
}

export default AuthController