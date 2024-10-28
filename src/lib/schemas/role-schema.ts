import { z } from "zod";

export const createRoleSchema = z.object({
    name: z.string().min(3).max(255),
})

export const updateRoleSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(255)
})

export type createRoleSchemaType = z.infer<typeof createRoleSchema>
export type updateRoleSchemaType = z.infer<typeof updateRoleSchema>