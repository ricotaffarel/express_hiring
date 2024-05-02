import { z } from "zod";

const loginValidation = z.object({
    username: z.string({ message: 'Username wajib diisi' }),
    password: z.string({ message: 'Password wajib diisi' }).min(6, 'Password minimal 6 characters')
})

export { loginValidation ,}
