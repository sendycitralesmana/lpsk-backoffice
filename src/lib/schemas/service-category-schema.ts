import { z } from "zod";

export const createServiceCategorySchema = z.object({
    name: z.string().min(3).max(255),
})

export const updateServiceCategorySchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(255)
})

export type createServiceCategorySchemaType = z.infer<typeof createServiceCategorySchema>
export type updateServiceCategorySchemaType = z.infer<typeof updateServiceCategorySchema>