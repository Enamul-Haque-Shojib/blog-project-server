import { z } from "zod";


const createBlogValidationSchema = z.object({
    body: z.object({
        title: z.string({message: "title is required"}),
        content: z.string({message: "content is required"}),
    })
})

export const BlogValidationSchema = {
    createBlogValidationSchema,
}