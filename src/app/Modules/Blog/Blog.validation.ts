import { z } from "zod";


const createBlogValidationSchema = z.object({
    body: z.object({
        title: z.string({message: "title is required"}),
        content: z.string({message: "content is required"}),
    })
})
const updateBlogValidationSchema = z.object({
    body: z.object({
        title: z.string({message: "title is required"}).optional(),
        content: z.string({message: "content is required"}).optional(),
    })
})

export const BlogValidationSchema = {
    createBlogValidationSchema,
    updateBlogValidationSchema
}