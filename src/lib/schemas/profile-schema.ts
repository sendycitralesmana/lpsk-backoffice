import { z } from "zod";

export const createProfileSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(255),
    description: z
        .string()
        .min(3, "Description must be at least 3 characters")
        .max(255),
    foto: z
        .string()
        .optional(),
    profileCategoryId: z
        .string()
        .optional(),
})

export const updateProfileSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(255),
    description: z
        .string()
        .min(3, "Description must be at least 3 characters")
        .max(255),
    foto: z
        .string()
        .optional(),
})

export type createProfileSchemaType = z.infer<typeof createProfileSchema>
export type updateProfileSchemaType = z.infer<typeof updateProfileSchema>