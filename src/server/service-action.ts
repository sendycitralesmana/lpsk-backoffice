'use server'

import prisma from '@/lib/prisma'
import { createServiceSchemaType, updateServiceSchemaType } from '@/lib/schemas/service-schema'
import { revalidatePath } from 'next/cache'

export const getServices = async () => {
    try {
        const services = await prisma.service.findMany()
        return services
    } catch (error) {
        console.log(error)
    }
}

export const getServicesByCategory = async (id: string) => {
    try {
        const services = await prisma.service.findMany({
            where: {
                serviceCategoryId: id
            }
        })
        return services
    } catch (error) {
        console.log(error)
    }
}

export const getService = async (id: string) => {
    const service = await prisma.service.findFirstOrThrow({
        where: {
            id
        }
    })
    return service
}

export const createService = async (data: createServiceSchemaType) => {
    try {
        const service = await prisma.service.create({
            data
        })
        revalidatePath('/backoffice/service-category')
        return service
    } catch (error) {
        console.log(error)
    }
}

export const updateService = async (id: string, data: updateServiceSchemaType) => {
    try {
        console.log(data)
        const service = await prisma.service.update({
            where: {
                id
            },
            data
        })
        revalidatePath('/backoffice/service-')
        return service
    } catch (error) {
        console.log(error)
    }
}

export const deleteService = async (id: string) => {
    try {
        const service = await prisma.service.delete({
            where: {
                id
            }
        })
        revalidatePath('/backoffice/service-')
        return service
    } catch (error) {
        console.log(error)
    }
}