import { z } from "zod";

export const createUserSchema = z.object({
    name: z.string().min(3).max(255),
    email: z.string().email(),
    password: z.string().min(6).max(255),
    image: z.string().optional(),
})

export const updateUserSchema = z.object({
    name: z
        .string()
        .min(3, "Name must be at least 3 characters")
        .max(255),
    email: z.string().email(),
    password: z.string().min(6).max(255),
    image: z.string().optional(),
})

export type createUserSchemaType = z.infer<typeof createUserSchema>
export type updateUserSchemaType = z.infer<typeof updateUserSchema>