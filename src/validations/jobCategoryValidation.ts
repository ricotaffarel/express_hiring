import { z } from "zod";

const jobCategoryValidation = z.object({
    name: z.string().min(4, {message: 'at least 4 characters'}),
})

export { jobCategoryValidation, }
