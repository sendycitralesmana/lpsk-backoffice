'use server'

import prisma from '@/lib/prisma'
import { createServiceCategorySchemaType, updateServiceCategorySchemaType } from '@/lib/schemas/service-category-schema'
import { revalidatePath } from 'next/cache'
import { ApiError } from 'next/dist/server/api-utils'

export const getServiceCategories = async () => {
    try {
        const serviceCategories = await prisma.serviceCategory.findMany({
            include: {
                _count: {
                    select: {
                        services: true
                    }
                }
            }
        })
        return serviceCategories
    } catch (error) {
        if (error instanceof Error) {
            throw new ApiError(405, "Bad Request");
        }
        throw new ApiError(500, "Internal Server Error");
    }
}

export const getServiceCategory = async (id: string) => {
    const serviceCategory = await prisma.serviceCategory.findFirstOrThrow({
        where: {
            id
        }
    })
    return serviceCategory
}

export const createServiceCategory = async (data: createServiceCategorySchemaType) => {
    try {
        const serviceCategory = await prisma.serviceCategory.create({
            data
        })
        revalidatePath('/backoffice/service-category')
        return serviceCategory
    } catch (error) {
        console.log(error)
    }
}

export const updateServiceCategory = async (id: string, data: updateServiceCategorySchemaType) => {
    try {
        const serviceCategory = await prisma.serviceCategory.update({
            where: {
                id
            },
            data
        })
        revalidatePath('/backoffice/service-category')
        return serviceCategory
    } catch (error) {
        console.log(error)
    }
}

export const deleteServiceCategory = async (id: string) => {
    try {
        const serviceCategory = await prisma.serviceCategory.delete({
            where: {
                id
            }
        })
        revalidatePath('/backoffice/service-category')
        return serviceCategory
    } catch (error) {
        console.log(error)
    }
}