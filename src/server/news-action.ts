'use server'

import prisma from '@/lib/prisma'
import { createNewsSchemaType, updateNewsSchemaType } from "@/lib/schemas/news-schema"
import { revalidatePath } from 'next/cache'

export const getNews = async () => {
    try {
        const news = await prisma.news.findMany()
        return news
    } catch (error) {
        console.log(error)
    }
}

export const getNewsByCategory = async (id: string) => {
    try {
        const news = await prisma.news.findMany({
            where: {
                newsCategoryId: id
            }
        })
        return news
    } catch (error) {
        console.log(error)
    }
}

export const getNewsById = async (id: string) => {
    const news = await prisma.news.findFirstOrThrow({
        where: {
            id
        }
    })
    return news
}

export const createNews = async (data: createNewsSchemaType) => {
    try {
        const news = await prisma.news.create({
            data
        })
        revalidatePath('/backoffice/news')
        return news
    } catch (error) {
        console.log(error)
    }
}

export const updateNews = async (id: string, data: updateNewsSchemaType) => {
    try {
        const news = await prisma.news.update({
            where: {
                id
            },
            data
        })
        revalidatePath('/backoffice/news')
        return news
    } catch (error) {
        console.log(error)
    }
}

export const deleteNews = async (id: string) => {
    try {
        const news = await prisma.news.delete({
            where: {
                id
            }
        })
        revalidatePath('/backoffice/news')
        return news
    } catch (error) {
        console.log(error)
    }
}