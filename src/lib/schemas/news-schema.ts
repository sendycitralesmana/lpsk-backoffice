import { z } from "zod";

export const createNewsSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(255),
    content: z
        .string()
        .min(3, "Content must be at least 3 characters"),
    cover: z
        .string()
        .optional(),
    document: z
        .string()
        .optional(),
    image: z
        .string()
        .optional(),
    video: z
        .string()
        .optional(),
    status: z
        .string()
        .min(3, "Status must be at least 3 characters"),
    newsCategoryId: z
        .string()
        .optional(),
    userId: z
        .string()
        .optional(),
})

export const updateNewsSchema = z.object({
    title: z
        .string()
        .min(3, "Title must be at least 3 characters")
        .max(255),
    content: z
        .string()
        .min(3, "Content must be at least 3 characters"),
    cover: z
        .string()
        .optional(),
    document: z
        .string()
        .optional(),
    image: z
        .string()
        .optional(),
    video: z
        .string()
        .optional(),
    status: z
        .string()
        .min(3, "Status must be at least 3 characters"),
    userId: z
        .string()
        .optional(),
})

export type createNewsSchemaType = z.infer<typeof createNewsSchema>
export type updateNewsSchemaType = z.infer<typeof updateNewsSchema>