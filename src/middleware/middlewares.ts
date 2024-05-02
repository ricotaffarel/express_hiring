import { Request, Response, NextFunction } from 'express';

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    // Anda bisa menambahkan logika pengecekan autentikasi di sini
    if (!(req.session as any).token) {
        return res.redirect('/login'); // Redirect ke halaman login jika tidak ada sesi user
    }
    next();
};

export const redirectToDashboard = (req: Request, res: Response, next: NextFunction) => {
    if ((req.session as any).token) {
        return res.redirect('/admin'); // Redirect ke dashboard jika pengguna sudah login
    }
    next();
};