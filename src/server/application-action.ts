'use server'

import prisma from '@/lib/prisma'
import { createApplicationSchemaType, updateApplicationSchemaType } from '@/lib/schemas/application-schema'
import { revalidatePath } from 'next/cache'

export const getApplications = async () => {
    try {
        const applications = await prisma.application.findMany()
        return applications
    } catch (error) {
        console.log(error)
    }
}

export const getApplicationsByCategory = async (id: string) => {
    try {
        const applications = await prisma.application.findMany({
            where: {
                applicationCategoryId: id
            }
        })
        return applications
    } catch (error) {
        console.log(error)
    }
}

export const getApplication = async (id: string) => {
    const application = await prisma.application.findFirstOrThrow({
        where: {
            id
        }
    })
    return application
}

export const createApplication = async (data: createApplicationSchemaType) => {
    try {
        const application = await prisma.application.create({
            data
        })
        revalidatePath('/backoffice/application')
        return application
    } catch (error) {
        console.log(error)
    }
}

export const updateApplication = async (id: string, data: updateApplicationSchemaType) => {
    try {
        const application = await prisma.application.update({
            where: {
                id
            },
            data
        })
        revalidatePath('/backoffice/application')
        return application
    } catch (error) {
        console.log(error)
    }
}

export const deleteApplication = async (id: string) => {
    try {
        const application = await prisma.application.delete({
            where: {
                id
            }
        })
        revalidatePath('/backoffice/application')
        return application
    } catch (error) {
        console.log(error)
    }
}