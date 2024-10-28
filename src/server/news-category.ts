'use server'

import prisma from '@/lib/prisma'
import { createNewsCategorySchemaType, updateNewsCategorySchemaType } from '@/lib/schemas/news-category-schema'
import { revalidatePath } from 'next/cache'

export const getNewsCategories = async () => {
    try {
        const newsCategories = await prisma.newsCategory.findMany({
            include: {
                _count: {
                    select: {
                        news: true
                    },
                }
            }
        })
        return newsCategories
    } catch (error) {
        console.log(error)
    }
}

export const getNewsCategory = async (id: string) => {
    const newsCategory = await prisma.newsCategory.findFirstOrThrow({
        where: {
            id
        },
    })
    return newsCategory
}

export const createNewsCategory = async (data: createNewsCategorySchemaType) => {
    try {
        const newsCategory = await prisma.newsCategory.create({
            data
        })
        revalidatePath('/backoffice/news-category')
        return newsCategory
    } catch (error) {
        console.log(error)
    }
}

export const updateNewsCategory = async (id: string, data: updateNewsCategorySchemaType) => {
    try {
        const newsCategory = await prisma.newsCategory.update({
            where: {
                id
            },
            data
        })
        revalidatePath('/backoffice/news-category')
        return newsCategory
    } catch (error) {
        console.log(error)
    }
}

export const deleteNewsCategory = async (id: string) => {
    try {
        const newsCategory = await prisma.newsCategory.delete({
            where: {
                id
            }
        })
        revalidatePath('/backoffice/news-category')
        return newsCategory
    } catch (error) {
        console.log(error)
    }
}