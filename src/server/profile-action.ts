'use server'

import prisma from "@/lib/prisma"
import { createProfileSchemaType, updateProfileSchemaType } from "@/lib/schemas/profile-schema"
import { revalidatePath } from 'next/cache'

export const getProfiles = async () => {
    try {
        const profiles = await prisma.profile.findMany()
        return profiles
    } catch (error) {
        console.log(error)
    }
}

export const getProfilesByCategory = async (id: string) => {
    try {
        const profiles = await prisma.profile.findMany({
            where: {
                profileCategoryId: id
            }
        })
        return profiles
    } catch (error) {
        console.log(error)
    }
}

export const getProfile = async (id: string) => {
    const profile = await prisma.profile.findFirstOrThrow({
        where: {
            id
        }
    })
    return profile
}

export const createProfile = async (data: createProfileSchemaType) => {
    try {
        const profile = await prisma.profile.create({
            data
        })
        revalidatePath('/backoffice/profile')
        return profile
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = async (id: string, data: updateProfileSchemaType) => {
    try {
        const profile = await prisma.profile.update({
            where: {
                id
            },
            data
        })
        revalidatePath('/backoffice/profile')
        return profile
    } catch (error) {
        console.log(error)
    }
}

export const deleteProfile = async (id: string) => {
    try {
        const profile = await prisma.profile.delete({
            where: {
                id
            }
        })
        revalidatePath('/backoffice/profile')
        return profile
    } catch (error) {
        console.log(error)
    }
}