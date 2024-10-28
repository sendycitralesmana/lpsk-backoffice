import { z } from "zod";

export const createNewsCategorySchema = z.object({
    name: z.string().min(3).max(255),
})

export const updateNewsCategorySchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(255)
})

export type createNewsCategorySchemaType = z.infer<typeof createNewsCategorySchema>
export type updateNewsCategorySchemaType = z.infer<typeof updateNewsCategorySchema>