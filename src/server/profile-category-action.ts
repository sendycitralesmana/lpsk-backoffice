'use server'

import prisma from '@/lib/prisma'
import { createApplicationSchemaType, updateApplicationSchemaType } from '@/lib/schemas/application-schema'
import { revalidatePath } from 'next/cache'

export const getProfileCategories = async () => {
    try {
        const profileCategories = await prisma.profileCategory.findMany({
            include: {
                _count: {
                    select: {
                        profiles: true
                    }
                }
            }
        })
        return profileCategories
    } catch (error) {
        console.log(error)
    }
}

export const getProfileCategory = async (id: string) => {
    try {
        const profileCategory = await prisma.profileCategory.findUnique({
            where: {
                id
            }
        })
        return profileCategory
    } catch (error) {
        console.log(error)
    }
}

export const createProfileCategory = async (data: createApplicationSchemaType) => {
    try {
        const profileCategory = await prisma.profileCategory.create({
            data
        })
        revalidatePath('/backoffice/profile-category')
        return profileCategory
    } catch (error) {
        console.log(error)
    }
}

export const updateProfileCategory = async (id: string, data: updateApplicationSchemaType) => {
    try {
        const profileCategory = await prisma.profileCategory.update({
            where: {
                id
            },
            data
        })
        revalidatePath('/backoffice/profile-category')
        return profileCategory
    } catch (error) {
        console.log(error)
    }
}

export const deleteProfileCategory = async (id: string) => {
    try {
        const profileCategory = await prisma.profileCategory.delete({
            where: {
                id
            }
        })
        revalidatePath('/backoffice/profile-category')
        return profileCategory
    } catch (error) {
        console.log(error)
    }
}