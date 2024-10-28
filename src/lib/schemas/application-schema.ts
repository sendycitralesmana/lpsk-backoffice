import { z } from "zod";

export const createApplicationSchema = z.object({
    title: z.string().min(3).max(255),
    cover: z.string().optional(),
    url: z.string().optional(),
    applicationCategoryId: z.string().optional(),
})

export const updateApplicationSchema = z.object({
    title: z.string().min(3).max(255),
    cover: z.string().optional(),
    url: z.string().optional(),
})

export type createApplicationSchemaType = z.infer<typeof createApplicationSchema>
export type updateApplicationSchemaType = z.infer<typeof updateApplicationSchema>