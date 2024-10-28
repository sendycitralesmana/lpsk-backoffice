import { z } from "zod";

export const createServiceSchema = z.object({
    documentName: z.string().min(3).max(255),
    documentUrl: z.string().min(3).max(255),
    status: z.string().min(3).max(255),
    serviceCategoryId: z.string().optional()
})

export const updateServiceSchema = z.object({
    documentName: z.string().min(3).max(255),
    documentUrl: z.string().min(3).max(255),
    status: z.string().min(3).max(255)
})

export type createServiceSchemaType = z.infer<typeof createServiceSchema>
export type updateServiceSchemaType = z.infer<typeof updateServiceSchema>