'use server'

import prisma from '@/lib/prisma'
import { createApplicationCategorySchemaType, updateApplicationCategorySchemaType } from '@/lib/schemas/application-category-schema'
import { revalidatePath } from 'next/cache'

export const getApplicationCategories = async () => {
    try {
        const applicationCategories = await prisma.applicationCategory.findMany({
            include: {
                _count: {
                    select: {
                        applications: true
                    }
                }
            }
        })
        return applicationCategories
    } catch (error) {
        console.log(error)
    }
}

export const getApplicationCategory = async (id: string) => {
    try {
        const applicationCategory = await prisma.applicationCategory.findUnique({
            where: {
                id
            }
        })
        return applicationCategory
    } catch (error) {
        console.log(error)
    }
}

export const createApplicationCategory = async (data: createApplicationCategorySchemaType) => {
    try {
        const applicationCategory = await prisma.applicationCategory.create({
            data
        })
        revalidatePath('/backoffice/application-category')
        return applicationCategory
    } catch (error) {
        console.log(error)
    }
}

export const updateApplicationCategory = async (id: string, data: updateApplicationCategorySchemaType) => {
    try {
        const applicationCategory = await prisma.applicationCategory.update({
            where: {
                id
            },
            data
        })
        revalidatePath('/backoffice/application-category')
        return applicationCategory
    } catch (error) {
        console.log(error)
    }
}

export const deleteApplicationCategory = async (id: string) => {
    try {
        const applicationCategory = await prisma.applicationCategory.delete({
            where: {
                id
            }
        })
        revalidatePath('/backoffice/application-category')
        return applicationCategory
    } catch (error) {
        console.log(error)
    }
}