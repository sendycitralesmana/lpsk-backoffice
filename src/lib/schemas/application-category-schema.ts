import { z } from "zod";

export const createApplicationCategorySchema = z.object({
    name: z.string().min(3).max(255),
})

export const updateApplicationCategorySchema = z.object({
    name: z.string().min(3).max(255)
})

export type createApplicationCategorySchemaType = z.infer<typeof createApplicationCategorySchema>
export type updateApplicationCategorySchemaType = z.infer<typeof updateApplicationCategorySchema>