import { z } from "zod";

export const createProfileCategorySchema = z.object({
    name: z.string().min(3).max(255),
})

export const updateProfileCategorySchema = z.object({
    name: z.string().min(3).max(255)
})

export type createProfileCategorySchemaType = z.infer<typeof createProfileCategorySchema>
export type updateProfileCategorySchemaType = z.infer<typeof updateProfileCategorySchema>